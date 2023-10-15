import {
  Body,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import myGateway from '../gateway/gateway.decorator';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Ball } from './ball';
import { BOT_SPEED, Paddle, SPEED } from './paddle';
import {
  CustomActions,
  GameConnection,
  GameRequest,
  GameRequestEvents,
  GameResponseEvents,
  GameRoom,
} from './game.interface';
import { GameEntity } from '../database/entities/game/game.service';
import { game_state } from '@prisma/client';
import { UserEntity } from '../database/entities/user/user.service';
import { AchievementsService } from '../achievements/achievements.service';
import { GameListItem } from '../database/transactions/game/game.interface';

const INTERVAL = 1000 / 60;
const MAX_POINTS = 5;

@Injectable()
@myGateway()
export class GameService {
  private rooms: GameRoom[] = [];

  constructor(
    private readonly gameEntity: GameEntity,
    private readonly userEntity: UserEntity,
    private readonly achievementService: AchievementsService,
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('game/keypress')
  handleKeyPress(@Body() data: GameRequest, @ConnectedSocket() client: Socket) {
    try {
      if (data.event === GameRequestEvents.KEY_PRESS) {
        const room = this.getRoom(data.roomId);
        if (!room || !room.acceptKeys) return;
        const player = room.players.find(
          (player) => player.socket === client.id,
        );
        if (!player) return;
        player.paddle.update(data.key);
      }
    } catch (e) {
      console.error(e);
    }
  }

  getRoom(roomId: number): GameRoom | null {
    try {
      return this.rooms.find((room) => room.roomId === roomId) ?? null;
    } catch (e) {
      console.error(e);
    }
  }

  sendRoom(room: GameRoom, event: string, body: any) {
    try {
      this.server.to(room.roomId.toString()).emit(event, body);
    } catch (e) {
      console.error(e);
    }
  }

  addBot(room: GameRoom) {
    try {
      room.players.push({
        studentId: '0',
        socket: '0',
        side: 'RIGHT',
        paddle: new Paddle(true, room.level),
        points: 0,
      });
    } catch (e) {
      console.error(e);
    }
  }

  createRoom(data: GameConnection, client: Socket): void {
    try {
      this.rooms.push({
        state: 'COUNTDOWN',
        roomId: data.roomId,
        players: [],
        ball: new Ball(),
        round: 1,
        mode: data.mode,
        acceptKeys: false,
        ...(data.mode === 'CUSTOM'
          ? {
              customProps: {
                action: 'NONE',
              },
            }
          : {}),
      });
    } catch (e) {
      console.error(e);
    }
  }

  joinRoom(data: GameConnection, client: Socket, room: GameRoom) {
    try {
      client.join(data.roomId.toString());
      if (room.players.length < 2) {
        const side = room.players.length === 0 ? 'LEFT' : 'RIGHT';
        room.players.push({
          studentId: data.studentId,
          socket: client.id,
          side: side,
          paddle:
            data.studentId === '0'
              ? new Paddle(true, room.level)
              : new Paddle(),
          points: 0,
        });
        return 'JOINED';
      } else {
        const player = room.players.find(
          (player) => player.studentId === data.studentId,
        );
        if (player) {
          player.socket = client.id;
          return 'RECONNECTED';
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  addToWacth(data: GameConnection, client: Socket) {
    try {
      client.join(data.roomId.toString());
    } catch (e) {
      console.error(e);
    }
  }

  resetRoom(room: GameRoom) {
    try {
      room.ball = new Ball();
      room.players.forEach((player) => {
        player.paddle =
          player.studentId === '0'
            ? new Paddle(true, room.level)
            : new Paddle();
      });
      if (room.customProps) {
        room.customProps.action = 'NONE';
      }
    } catch (e) {
      console.error(e);
    }
  }

  async parseGame(room: GameRoom): Promise<GameListItem> {
    try {
      return {
        id: room.roomId,
        players: await Promise.all(
          room.players.map(async (player) => {
            const user = await this.userEntity.findOne({
              studentId: player.studentId,
            });
            return {
              studentId: user.studentId,
              username: user.username,
              avatar: user.avatar,
              status: user.status,
            };
          }),
        ),
        mode: room.mode,
        points: [room.players[0].points, room.players[1].points],
        ...(room.level ? { level: room.level } : {}),
        type: room.players.find((player) => player.studentId === '0')
          ? 'SOLO'
          : 'DUO',
      };
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('game/amIInGame')
  async handleDisconnectedPlayer(
    @Body() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!data.studentId) return;
      const room = this.rooms.find((room) =>
        room.players.find((player) => player.studentId === data.studentId),
      );
      if (room) {
        this.parseGame(room).then((game) => {
          client.emit('game/amIInGame', { data: game });
        });
      } else client.emit('game/amIInGame', { data: null });
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('game/connection')
  handleConnect(@Body() data: any, @ConnectedSocket() client: Socket) {
    try {
      if (data.event === GameRequestEvents.CONNECTION) {
        const room = this.getRoom(data.roomId);
        if (data.connection === true) {
          if (room) {
            const state = this.joinRoom(data, client, room);
            this.startGame(room, state);
            return;
          } else {
            this.createRoom(data, client);
            const room = this.getRoom(data.roomId);
            this.joinRoom(data, client, room);
            const newRoom = this.getRoom(data.roomId);
            if ((data as GameConnection).solo) {
              this.addBot(newRoom);
              newRoom.level = (data as GameConnection).level;
              this.startGame(newRoom);
              return;
            }
          }
        } else {
          this.gameEnd(room, client);
        }
      } else if (data.event === GameRequestEvents.WATCH) {
        const room = this.getRoom(data.roomId);
        if (room) {
          this.handleGameInitialData(room);
          this.addToWacth(data, client);
          this.sendResume(room);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  updateGamePoints(room: GameRoom) {
    try {
      this.gameEntity.update({
        where: { id: room.roomId },
        data: {
          points: [room.players[0].points, room.players[1].points],
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  updatePlayersStatus(room: GameRoom, status: 'IN_GAME' | 'ONLINE') {
    try {
      this.userEntity
        .findOne({
          studentId: room.players[0].studentId,
        })
        .then((user) => {
          if (user.status !== 'OFFLINE' && user.username !== 'Bot') {
            this.userEntity.update({
              where: { studentId: room.players[0].studentId },
              data: { status },
            });
          }
        });
      this.userEntity
        .findOne({
          studentId: room.players[1].studentId,
        })
        .then((user) => {
          if (user.status !== 'OFFLINE' && user.username !== 'Bot') {
            this.userEntity.update({
              where: { studentId: room.players[1].studentId },
              data: { status },
            });
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  gameStart(room: GameRoom, isSolo: boolean) {
    // recursive function
    const timeout = (count: number) => {
      setTimeout(() => {
        if (count === 0) {
          this.gameLoop(room, isSolo);
          this.refreshGamesToWatch();
          return;
        } else {
          this.sendRoom(room, 'game/countdown', {
            event: GameResponseEvents.COUNTDOWN,
            count: count,
          });
          timeout(count - 1);
        }
      }, 1000);
    };
    //-------------------------------------
    try {
      room.acceptKeys = false;
      this.resetRoom(room);
      this.updateGameState(room, 'NEW_ROUND');
      this.sendRoom(room, 'game/countdown', {
        event: GameResponseEvents.COUNTDOWN,
        count: 3,
      });
      timeout(2);
    } catch (e) {
      console.error(e);
    }
  }

  changeSpeed(room: GameRoom, type: 'UP' | 'DOWN', element: 'PADDLE' | 'BALL') {
    const helper = (count: number) => {
      if (count < 3) {
        setTimeout(() => {
          if (element === 'BALL')
            room.ball.velocity *= type === 'UP' ? 1.15 : 0.8;
          else {
            room.players[0].paddle.speed *= type === 'UP' ? 1.2 : 0.7;
            room.players[1].paddle.speed *= type === 'UP' ? 1.2 : 0.7;
          }
          helper(++count);
        }, 1000);
      } else {
        return;
      }
    };
    try {
      let count = 0;
      if (room.customProps) helper(count);
    } catch (e) {
      console.error(e);
    }
  }

  revertSpeed(room: GameRoom, type: 'UP' | 'DOWN', element: 'PADDLE' | 'BALL') {
    const helper = (count: number) => {
      if (count < 3) {
        setTimeout(() => {
          if (element === 'BALL')
            room.ball.velocity /= type === 'UP' ? 1.15 : 0.8;
          else {
            room.players[0].paddle.speed /= type === 'UP' ? 1.2 : 0.7;
            room.players[1].paddle.speed /= type === 'UP' ? 1.2 : 0.7;
          }
          helper(++count);
        }, 1000);
      } else {
        room.customProps.action = 'NONE';
        return;
      }
    };
    try {
      let count = 0;

      if (room.customProps) helper(count);
    } catch (e) {
      console.error(e);
    }
  }

  getCustomAction() {
    try {
      const getRandomCustomAction = (): CustomActions => {
        const actions = [
          'BALL_SPEED_UP',
          'BALL_SPEED_DOWN',
          'PADDLE_SPEED_UP',
          'PADDLE_SPEED_DOWN',
          'INVERT_CONTROLS',
        ];
        return actions[
          Math.floor(Math.random() * actions.length)
        ] as CustomActions;
      };
      return getRandomCustomAction();
    } catch (e) {
      console.error(e);
    }
  }

  swapPlayers(room: GameRoom) {
    try {
      const tmpSpeed = room.players[0].paddle.speed;
      room.players[0].paddle.speed = room.players[1].paddle.speed;
      room.players[1].paddle.speed = tmpSpeed;
      const tmpPaddle = room.players[0].paddle;
      room.players[0].paddle = room.players[1].paddle;
      room.players[1].paddle = tmpPaddle;
      const tmpPlayer = room.players[0];
      room.players[0] = room.players[1];
      room.players[1] = tmpPlayer;
    } catch (e) {
      console.error(e);
    }
  }

  handleCostumMode(room: GameRoom, ref: { count: number }) {
    try {
      if (room.mode === 'CUSTOM') {
        if (ref.count == 180 && room.customProps.action === 'NONE') {
          const action = this.getCustomAction();
          this.sendAction(room, action);
          if (action !== 'NONE') {
            if (action === 'BALL_SPEED_DOWN' || action === 'BALL_SPEED_UP') {
              room.customProps.action = action;
              this.changeSpeed(
                room,
                action === 'BALL_SPEED_UP' ? 'UP' : 'DOWN',
                'BALL',
              );
              setTimeout(() => {
                this.revertSpeed(
                  room,
                  action === 'BALL_SPEED_UP' ? 'UP' : 'DOWN',
                  'BALL',
                );
                setTimeout(() => {
                  ref.count = 0;
                }, 5000);
              }, 5000);
            } else if (
              action === 'PADDLE_SPEED_UP' ||
              action === 'PADDLE_SPEED_DOWN'
            ) {
              room.customProps.action = action;
              this.changeSpeed(
                room,
                action === 'PADDLE_SPEED_UP' ? 'UP' : 'DOWN',
                'PADDLE',
              );
              setTimeout(() => {
                this.revertSpeed(
                  room,
                  action === 'PADDLE_SPEED_UP' ? 'UP' : 'DOWN',
                  'PADDLE',
                );
                setTimeout(() => {
                  ref.count = 0;
                }, 5000);
              }, 5000);
            } else if (action === 'INVERT_CONTROLS') {
              setTimeout(() => {
                this.swapPlayers(room);
                room.customProps.action = action;
                setTimeout(() => {
                  this.swapPlayers(room);
                  room.customProps.action = 'NONE';
                  setTimeout(() => {
                    ref.count = 0;
                  }, 5000);
                }, 5000);
              }, 1000);
            }
          } else
            setTimeout(() => {
              room.customProps.action = 'NONE';
              ref.count = 0;
            }, 5000);
        }
        ref.count++;
      }
    } catch (e) {
      console.error(e);
    }
  }

  sendAction(room: GameRoom, action: CustomActions) {
    try {
      if (action === 'NONE') return;
      const event = 'game/actions';
      const body = {
        action: action,
      };
      this.sendRoom(room, event, body);
    } catch (e) {
      console.error(e);
    }
  }

  waiter(room: GameRoom, isSolo: boolean) {
    try {
      if (room.customProps && room.customProps.action !== 'NONE')
        setTimeout(() => {
          this.waiter(room, isSolo);
        }, 500);
      else this.gameStart(room, isSolo);
    } catch (e) {
      console.error(e);
    }
  }

  gameLoop(room: GameRoom, isSolo: boolean) {
    let ref = { count: 0 };
    const interval = () => {
      setTimeout(() => {
        if (this.handleLoose(room)) {
          if (
            room.players[0].points === MAX_POINTS ||
            room.players[1].points === MAX_POINTS
          ) {
            this.gameEnd(room);
            return;
          } else {
            this.updateGamePoints(room);
            this.waiter(room, isSolo);
            return;
          }
        } else {
          room.ball.update(
            INTERVAL,
            room.players[0].paddle.position,
            room.players[1].paddle.position,
          );
          if (isSolo) {
            const bot = room.customProps?.action === 'INVERT_CONTROLS' ? 0 : 1;
            room.players[bot].paddle.updateBot(
              INTERVAL,
              room.ball.y,
              room.level,
            );
          }
          this.sendRoom(room, 'game/position', {
            event: GameResponseEvents.POSITION,
            leftPaddle: {
              y: room.players[0].paddle.position,
              config: {
                duration: INTERVAL * 4,
              },
            },
            rightPaddle: {
              y: room.players[1].paddle.position,
              config: {
                duration: INTERVAL * 4,
              },
            },
            ball: {
              x: room.ball.x,
              y: room.ball.y,
              config: {
                duration: INTERVAL,
              },
            },
          });
          this.handleCostumMode(room, ref);
          interval();
        }
      }, INTERVAL);
    };
    //-------------------------------------
    try {
      this.updateGameState(room, 'START');
      room.acceptKeys = true;
      interval();
    } catch (e) {
      console.error(e);
    }
  }

  gameEnd(room: GameRoom, client?: Socket) {
    this.updateGameState(room, 'END');
    this.sendResume(room);
    this.updatePlayersStatus(room, 'ONLINE');
    this.updateAchievements(room);
    if (client) {
      client.leave(room.roomId.toString());
    }
    const found = this.rooms.indexOf(room);
    if (found !== -1) {
      this.rooms.splice(found, 1);
      this.refreshGamesToWatch();
    }
  }

  refreshGamesToWatch() {
    try {
      const parseUser = (user) => {
        return {
          studentId: user.studentId,
          username: user.username,
          avatar: user.avatar,
          status: user.status,
        };
      };
      this.gameEntity.getAll().then((allGames) => {
        let games: GameListItem[] = [];
        allGames.forEach((game) => {
          if (game.state === 'PLAYING') {
            games.push({
              id: game.id,
              players: game.players.map((player) => {
                return parseUser(player);
              }),
              mode: game.mode,
              ...(game.winner ? { winner: parseUser(game.winner) } : {}),
              ...(game.loser ? { looser: parseUser(game.loser) } : {}),
              points: game.points,
            });
          }
        });
        this.server.emit('game/list', {
          data: games,
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  updateAchievements(room: GameRoom) {
    try {
      // check for bot games achievements
      const botPlayer = room.players.find((player) => player.studentId === '0');
      if (botPlayer) {
        const otherPlayer = room.players.find(
          (player) => player.studentId !== '0',
        );
        if (otherPlayer.points === MAX_POINTS) {
          this.achievementService.updateBotGamesAchievements(
            otherPlayer.studentId,
            room.level,
          );
          this.achievementService.updateAllGamesAchievements(
            otherPlayer.studentId,
          );
        }
      } else {
        const winner = room.players.find(
          (player) => player.points === MAX_POINTS,
        );
        this.achievementService.updateAllGamesAchievements(winner.studentId);
        this.achievementService.updateFriendGamesAchievements(winner.studentId);
      }
    } catch (e) {
      console.error(e);
    }
  }

  startGame(room: GameRoom, state?: 'JOINED' | 'RECONNECTED') {
    try {
      this.updatePlayersStatus(room, 'IN_GAME');
      this.handleGameInitialData(room);
      if (!state || state === 'JOINED') {
        this.resetRoom(room);
        const isSolo = room.players.find((player) => player.studentId === '0');
        this.gameStart(room, isSolo ? true : false);
      } else {
        this.sendRoom(room, 'game/points', {
          event: GameResponseEvents.POINTS,
          leftPoints:
            room.customProps?.action === 'INVERT_CONTROLS'
              ? room.players[1].points
              : room.players[0].points,
          rightPoints:
            room.customProps?.action === 'INVERT_CONTROLS'
              ? room.players[0].points
              : room.players[1].points,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  sendResume(room: GameRoom) {
    try {
      const leftPlayerStudentId = room.players.find(
        (player) => player.side === 'LEFT',
      ).studentId;
      const rightPlayerStudentId = room.players.find(
        (player) => player.side === 'RIGHT',
      ).studentId;
      this.userEntity
        .findOne({
          studentId: leftPlayerStudentId,
        })
        .then((leftPlayer) => {
          return this.userEntity
            .findOne({
              studentId: rightPlayerStudentId,
            })
            .then((rightPlayer) => {
              const resume = {
                leftPlayer: {
                  studentId: leftPlayer.studentId,
                  username: leftPlayer.username,
                  avatar: leftPlayer.avatar,
                  status: leftPlayer.status,
                },
                rightPlayer: {
                  studentId: rightPlayer.studentId,
                  username: rightPlayer.username,
                  avatar: rightPlayer.avatar,
                  status: rightPlayer.status,
                },
              };
              this.sendRoom(room, 'game/resume', resume);
            });
        });
      this.refreshGamesToWatch();
    } catch (e) {
      console.error(e);
    }
  }

  async handleGameInitialData(room: GameRoom) {
    try {
      const leftUser = await this.userEntity.findOne({
        studentId: room.players.find((player) => player.side === 'LEFT')
          .studentId,
      });
      const rightUser = await this.userEntity.findOne({
        studentId: room.players.find((player) => player.side === 'RIGHT')
          .studentId,
      });
      this.sendRoom(room, 'game/initialData', {
        leftUser: {
          username: leftUser.username,
          avatar: leftUser.avatar,
        },
        rightUser: {
          username: rightUser.username,
          avatar: rightUser.avatar,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleLoose(room: GameRoom) {
    try {
      const loose = room.ball.checkLoose();
      if (!loose) return false;
      const winningIndex = loose === 'LEFT' ? 1 : 0;
      room.players[winningIndex].points++;
      this.sendRoom(room, 'game/points', {
        event: GameResponseEvents.POINTS,
        leftPoints:
          room.customProps && room.customProps.action === 'INVERT_CONTROLS'
            ? room.players[1].points
            : room.players[0].points,
        rightPoints:
          room.customProps && room.customProps.action === 'INVERT_CONTROLS'
            ? room.players[0].points
            : room.players[1].points,
      });
      this.refreshGamesToWatch();
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  updateGameState(room: GameRoom, status: 'START' | 'NEW_ROUND' | 'END') {
    try {
      const state = status === 'END' ? game_state.FINISHED : game_state.PLAYING;
      this.gameEntity.update({
        where: { id: room.roomId },
        data: { state },
      });
      if (status === 'END') {
        const winnerIndex =
          room.players[0].points > room.players[1].points ? 0 : 1;
        const loserIndex = winnerIndex === 0 ? 1 : 0;
        this.gameEntity
          .update({
            where: { id: room.roomId },
            data: {
              winner: {
                connect: { studentId: room.players[winnerIndex].studentId },
              },
              loser: {
                connect: { studentId: room.players[loserIndex].studentId },
              },
              points: [room.players[0].points, room.players[1].points],
            },
          })
          .then(() => {
            this.refreshGamesToWatch();
          });
      }
      this.sendRoom(room, 'game/status', {
        event: GameResponseEvents.STATUS,
        status,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
