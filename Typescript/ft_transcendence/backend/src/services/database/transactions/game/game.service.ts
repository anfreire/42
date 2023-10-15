import { Injectable } from '@nestjs/common';
import { GameEntity } from '../../entities/game/game.service';
import { UserEntity } from '../../entities/user/user.service';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Body } from '@nestjs/common';
import { Data, Response } from 'src/app.interface';
import { GameExtended, UserExtended } from '../../entities/entities.interface';
import myGateway from 'src/services/gateway/gateway.decorator';
import {
  GameJoin,
  GameListItem,
  GameQueue,
  GameSelection,
  Message,
} from './game.interface';
import { User as PrismaUser, game_mode } from '@prisma/client';
import { User } from '../user/user.interface';
import { MessageEntity } from '../../entities/message/message.service';
import { RefreshService } from 'src/services/refresh/refresh.service';
import { AchievementsService } from 'src/services/achievements/achievements.service';

@Injectable()
@myGateway()
export class GameService {
  private queue: GameQueue[] = [];

  /**
   * @details Loads all game invites from database messages and adds them to queue
   */
  constructor(
    private readonly userEntity: UserEntity,
    private readonly gameEntity: GameEntity,
    private readonly messageEntity: MessageEntity,
    private readonly refreshService: RefreshService,
  ) {
    try {
      this.messageEntity.getAll().then((messages) => {
        messages.forEach((message) => {
          if (message.isGame) {
            const selection: GameSelection = JSON.parse(message.content);
            this.queue.push({
              ...selection,
              studentId: message.sender.studentId,
              on: message.channel ? 'CHANNEL' : 'CHAT',
              message: {
                id: message.id,
                from: {
                  studentId: message.sender.studentId,
                  username: message.sender.username,
                  avatar: message.sender.avatar,
                  status: message.sender.status,
                },
                content: message.content,
                createdAt: message.createdAt,
                isGame: message.isGame,
              },
            });
          }
        });
      });
      this.gameEntity.getAll().then((games) => {
        games.map((game) => {
          if (game.state === 'PLAYING') {
            this.gameEntity.update({
              where: { id: game.id },
              data: { state: 'FINISHED' },
            });
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  @WebSocketServer() server: Server;

  /**
   * @brief Parses user data to User
   *
   * @param user UserExtended | PrismaUser
   *
   * @returns User
   */
  parseUser(user: UserExtended | PrismaUser): User {
    try {
      return {
        studentId: user.studentId,
        username: user.username,
        avatar: user.avatar,
        status: user.status,
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Parses game data to GameListItem
   *
   * @param game GameExtended
   *
   * @returns GameListItem
   */
  parseGame(game: GameExtended): GameListItem {
    try {
      return {
        id: game.id,
        players: game.players.map((player) => {
          return this.parseUser(player);
        }),
        mode: game.mode,
        ...(game.winner ? { winner: this.parseUser(game.winner) } : {}),
        ...(game.loser ? { looser: this.parseUser(game.loser) } : {}),
        points: game.points,
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Removes game from queue and returns it
   *
   * @param game GameQueue
   *
   * @returns GameQueue
   */
  removeFromQueue(game: GameQueue): GameQueue {
    try {
      const found = this.queue.find(
        (g) =>
          g.studentId === game.studentId &&
          g.mode === game.mode &&
          g.on === game.on,
      );
      if (found?.message) {
        this.messageEntity.findOne({ id: found.message.id }).then((message) => {
          if (message) this.messageEntity.delete({ id: message.id });
        });
      }
      return this.queue.splice(this.queue.indexOf(game), 1)[0];
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Checks if Selection data is valid
   *
   * @param data any
   *
   * @returns boolean
   */
  checkSelection(data: any): boolean {
    try {
      return (
        data.type &&
        data.mode &&
        ((data.type === 'SOLO' && data.level) || data.type === 'DUO')
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Checks if Queue data is valid
   *
   * @param data any
   *
   * @returns boolean
   */
  checkQueue(data: any): boolean {
    try {
      return (
        data.studentId !== undefined &&
        data.on !== undefined &&
        ((data.on === 'CHANNEL' && data.message !== undefined) ||
          (data.on === 'CHAT' && data.message !== undefined) ||
          data.on === 'QUEUE')
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Checks if Join data is valid
   *
   * @param data any
   *
   * @returns boolean
   */
  checkJoin(data: any): boolean {
    try {
      return data.whoJoinsStudentId !== undefined;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Adds game to queue
   *
   * @param game GameQueue
   *
   * @returns void
   */
  addToQueue(game: GameQueue) {
    try {
      this.queue.push(game);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Starts game and returns it
   *
   * @param game GameJoin
   *
   * @returns GameExtended
   */
  async startGame(game: GameJoin) {
    try {
      const res = await this.gameEntity.create({
        mode: game.mode === 'CLASSIC' ? game_mode.CLASSIC : game_mode.CUSTOM,
        players: {
          connect: [
            { studentId: game.studentId },
            { studentId: game.whoJoinsStudentId },
          ],
        },
        state: 'PLAYING',
      });
      if (game.on !== 'QUEUE' && game.message) {
        this.messageEntity.findOne({ id: game.message.id }).then((message) => {
          if (message) this.messageEntity.delete({ id: message.id });
        });
      }
      const user1 = await this.userEntity.findOne({
        studentId: game.studentId,
      });
      const user2 = await this.userEntity.findOne({
        studentId: game.whoJoinsStudentId,
      });
      if (user1.username !== 'Bot')
        await this.userEntity.update({
          where: { studentId: user1.studentId },
          data: { status: 'IN_GAME' },
        });
      if (user2.username !== 'Bot')
        await this.userEntity.update({
          where: { studentId: user2.studentId },
          data: { status: 'IN_GAME' },
        });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Starts solo game and returns it
   *
   * @param game GameQueue
   *
   * @returns GameExtended
   */
  async startSoloGame(game: GameQueue): Promise<GameExtended> {
    try {
      const bot = await this.userEntity.findOne({
        username: 'Bot',
      });
      const gameJoin: GameJoin = {
        ...game,
        whoJoinsStudentId: bot.studentId,
      };
      const res = await this.startGame(gameJoin);
      this.refreshService.sendQueueMatch(gameJoin, this.parseGame(res));
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Starts duo game and returns it
   *
   * @param game GameQueue
   *
   * @returns GameExtended
   */
  async startDuoGame(game: GameJoin): Promise<GameExtended> {
    try {
      const foundGame = this.removeFromQueue(game);
      if (!foundGame) return null;
      else {
        const startedGame = await this.startGame(game);
        const parsed = this.parseGame(startedGame);
        this.refreshService.sendQueueMatch(game, parsed);
        return startedGame;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateGameStatus() {
    try {
      const allGames = await this.gameEntity.getAll();
      await Promise.all(
        allGames.map(async (game) => {
          if (game.points[0] >= 5 || game.points[1] >= 5) {
            const winner =
              game.points[0] > game.points[1]
                ? game.players[0]
                : game.players[1];
            const loser =
              game.points[0] > game.points[1]
                ? game.players[1]
                : game.players[0];
            await this.gameEntity.update({
              where: { id: game.id },
              data: {
                state: 'FINISHED',
                winner: { connect: { studentId: winner.studentId } },
                loser: { connect: { studentId: loser.studentId } },
              },
            });
          }
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Sends all ongoing games to client
   *
   * @listens Socket `game/list`
   *
   * @param data {}
   * @param client Socket
   *
   * @emits Socket `game/list` { data: GameListItem[] }
   * @returns void
   */
  @SubscribeMessage('game/list')
  getCurrGames(@Body() data, @ConnectedSocket() client) {
    try {
      this.updateGameStatus().then(() => {
        this.gameEntity.getAll().then((allGames) => {
          let games: GameListItem[] = [];
          allGames.forEach((game) => {
            if (game.state === 'PLAYING') {
              games.push(this.parseGame(game));
            }
          });
          client.emit('game/list', {
            data: games,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Create a game
   *
   * @listens Socket `game/create/solo`
   *
   * @param data { type: 'SOLO' | 'DUO', mode: 'CLASSIC' | 'CUSTOM', level?: number }
   * @param client Socket
   *
   * @emits Socket `game/create/solo` { data: GameListItem }
   * @returns void
   *
   * @details if type is SOLO, creates a game with a bot, otherwise adds game to queue
   */
  @SubscribeMessage('game/create/solo')
  createGame(@Body() data, @ConnectedSocket() client: Socket) {
    try {
      if (!this.checkSelection(data) || !this.checkQueue(data)) {
        client.emit('game/create/solo', {
          error: 'Invalid data',
        });
      } else {
        this.startSoloGame(data).then((game) => {
          client.emit('game/create/solo', {
            data: this.parseGame(game),
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Removes game from queue
   *
   * @listens Socket `game/queue/leave`
   *
   * @param data { studentId: string }
   * @param client Socket
   *
   * @emits Socket `game/queue/leave` { success: 'Game removed from queue' }
   * @returns void
   */
  @SubscribeMessage('game/queue/leave')
  leaveQueue(@Body() data, @ConnectedSocket() client: Socket) {
    try {
      if (!data.studentId)
        client.emit('game/queue/leave', { error: 'Invalid data' });
      else {
        const game = this.queue.find(
          (game) => game.studentId === data.studentId,
        );
        if (!game) client.emit('game/queue/leave', { error: 'Game not found' });
        else {
          this.removeFromQueue(game);
          client.emit('game/queue/leave', {
            success: 'Game removed from queue',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Adds game to queue
   *
   * @listens Socket `game/queue`
   *
   * @param data { type: 'SOLO' | 'DUO', mode: 'CLASSIC' | 'CUSTOM', level?: number }
   * @param client Socket
   *
   * @emits Socket `game/queue` { success: 'Game added to queue' }
   * @returns void
   *
   * @details if game with same mode is in queue, start the game if both players are online and not blocked
   */
  @SubscribeMessage('game/queue')
  enterQueue(@Body() data, @ConnectedSocket() client: Socket) {
    try {
      if (!this.checkSelection(data) || !this.checkQueue(data)) {
        client.emit('game/queue', {
          error: 'Invalid data',
        });
      } else {
        const sameMode = this.queue.find(
          (game) =>
            game.mode === data.mode &&
            game.on === 'QUEUE' &&
            data.on === 'QUEUE',
        );
        this.userEntity
          .findOne({
            studentId: data.studentId,
          })
          .then(() => {
            if (sameMode) {
              this.userEntity
                .findOne({
                  studentId: sameMode.studentId,
                })
                .then((friend) => {
                  if (friend.status === 'OFFLINE') {
                    this.queue.splice(this.queue.indexOf(sameMode), 1);
                  } else {
                    const body: GameJoin = {
                      ...sameMode,
                      whoJoinsStudentId: data.studentId,
                    };
                    this.startDuoGame(body).then((game) => {
                      if (!game) {
                        client.emit('game/queue', {
                          error: 'Game not found',
                        });
                      } else {
                        client.emit('game/queue', {
                          data: this.parseGame(game),
                        });
                        return;
                      }
                    });
                  }
                });
            }
            this.queue.push(data);
            client.emit('game/queue', {
              success: 'Game added to queue',
            });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Joins a game (channel, chat)
   *
   * @listens Socket `game/join`
   *
   * @param data { studentId: string, whoJoinsStudentId: string, on: 'CHANNEL' | 'CHAT', message?: Message }
   * @param client Socket
   *
   * @emits Socket `game/join` { data: GameListItem }
   * @returns void
   */
  @SubscribeMessage('game/join')
  joinGame(@Body() data, @ConnectedSocket() client: Socket) {
    try {
      if (
        !this.checkSelection(data) ||
        !this.checkQueue(data) ||
        !this.checkJoin(data)
      ) {
        client.emit('game/join', {
          error: 'Invalid data',
        });
      } else {
        this.userEntity
          .findOne({
            studentId: data.studentId,
          })
          .then((friend) => {
            this.userEntity
              .findOne({
                studentId: data.whoJoinsStudentId,
              })
              .then((user) => {
                if (
                  friend.status === 'OFFLINE' ||
                  friend.status === 'IN_GAME'
                ) {
                  client.emit('game/join', {
                    error: 'Friend is unavailable to play',
                  });
                } else if (user.status === 'IN_GAME') {
                  client.emit('game/join', {
                    error: 'Finish your game first',
                  });
                } else {
                  this.startDuoGame(data).then((game) => {
                    if (!game) {
                      client.emit('game/join', {
                        error: 'Game not found',
                      });
                    } else {
                      client.emit('game/join', {
                        data: this.parseGame(game),
                      });
                    }
                  });
                }
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
