import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { UserExtended } from '../database/entities/entities.interface';
import { UserEntity } from '../database/entities/user/user.service';
import myGateway from '../gateway/gateway.decorator';
import { Body, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { RefreshService } from '../refresh/refresh.service';

@Injectable()
@myGateway()
export class AchievementsService {
  private readonly achievements = [
    'winFirstGame',
    'winThreeTimes',
    'winAgainstFriend',
    'winAgainstBotEasy',
    'winAgainstBotMedium',
    'winAgainstBotHard',
    'firstInLeaderboard',
    'inviteGameInChat',
    'inviteGameInChannel',
  ];

  constructor(
    private readonly userEntity: UserEntity,
    private readonly refreshService: RefreshService,
  ) {}

  /**
   * @brief Updates the `winFirstGame` and `winThreeTimes` achievements of the user
   *
   * @param studentId string
   *
   * @returns void
   */
  updateAllGamesAchievements(studentId: string) {
    try {
      this.userEntity
        .findOne({
          studentId: studentId,
        })
        .then((user) => {
          if (
            user.achievements.winFirstGame &&
            user.achievements.winThreeTimes
          ) {
            return;
          }
          let gamesWon = 0;
          user.games.forEach((game) => {
            if (game.winnerId === user.id) {
              gamesWon++;
            }
          });
          if (gamesWon >= 1) {
            if (gamesWon >= 3) {
              user.achievements.winThreeTimes = true;
            }
            user.achievements.winFirstGame = true;
            this.userEntity
              .update({
                where: { id: user.id },
                data: {
                  achievements: {
                    update: {
                      winFirstGame: user.achievements.winFirstGame,
                      winThreeTimes: user.achievements.winThreeTimes,
                    },
                  },
                },
              })
              .then(() => {
                this.refreshService.updateAchievements(user.studentId);
              });
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Updates the `winAgainstFriend` achievement of the user
   *
   * @param studentId string
   *
   * @returns void
   */
  updateFriendGamesAchievements(studentId: string) {
    try {
      this.userEntity
        .findOne({
          studentId: studentId,
        })
        .then((user) => {
          if (user.achievements.winAgainstFriend) {
            return;
          }
          let winAgainstFriend = false;
          user.games.forEach((game) => {
            if (
              game.winnerId === user.id &&
              user.friends.some((friend) => friend.id === game.loserId)
            ) {
              winAgainstFriend = true;
            }
          });
          if (winAgainstFriend && !user.achievements.winAgainstFriend)
            this.userEntity
              .update({
                where: { id: user.id },
                data: {
                  achievements: {
                    update: { winAgainstFriend: winAgainstFriend },
                  },
                },
              })
              .then(() => {
                this.refreshService.updateAchievements(user.studentId);
              });
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Updates the `winAgainstBotEasy`, `winAgainstBotMedium` and `winAgainstBotHard` achievements of the user
   *
   * @details This function is called after a game against a bot is finished
   *
   * @param studentId string
   * @param level 'EASY' | 'MEDIUM' | 'HARD'
   *
   * @returns void
   */
  updateBotGamesAchievements(
    studentId: string,
    level: 'EASY' | 'MEDIUM' | 'HARD',
  ) {
    try {
      const achievements = {
        EASY: 'winAgainstBotEasy',
        MEDIUM: 'winAgainstBotMedium',
        HARD: 'winAgainstBotHard',
      };
      this.userEntity
        .findOne({
          studentId: studentId,
        })
        .then((user) => {
          this.userEntity
            .update({
              where: { id: user.id },
              data: {
                achievements: { update: { [achievements[level]]: true } },
              },
            })
            .then(() => {
              this.refreshService.updateAchievements(user.studentId);
            });
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Updates the `firstInLeaderboard` achievement of the user
   *
   * @details This function is called when the leaderboard is requested by a user
   *
   * @param studentId string
   *
   * @returns void
   */
  updateLeaderboardAchievements(studentId: string) {
    try {
      this.userEntity
        .findOne({
          studentId: studentId,
        })
        .then((user) => {
          if (user.achievements.firstInLeaderboard) {
            return;
          }
          this.userEntity
            .update({
              where: { id: user.id },
              data: {
                achievements: { update: { firstInLeaderboard: true } },
              },
            })
            .then(() => {
              this.refreshService.updateAchievements(user.studentId);
            });
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Updates the `inviteGameInChat` and `inviteGameInChannel` achievements of the user
   *
   * @details This function is called when a user invites another user to a game in a chat or a channel
   *
   * @param user UserExtended
   * @param type 'CHAT' | 'CHANNEL'
   *
   * @returns void
   */
  updateGameInviteAchievements(user: UserExtended, type: 'CHAT' | 'CHANNEL') {
    try {
      const achievements = {
        CHAT: 'inviteGameInChat',
        CHANNEL: 'inviteGameInChannel',
      };
      this.userEntity
        .update({
          where: { id: user.id },
          data: {
            achievements: { update: { [achievements[type]]: true } },
          },
        })
        .then(() => {
          this.refreshService.updateAchievements(user.studentId);
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Calculates the points of a user for the leaderboard
   *
   * @details Helper function for the `getLeaderBoard` function
   *
   * @param user UserExtended
   *
   * @returns number
   */
  getLeaderBoradPoints(user: UserExtended) {
    try {
      let points = 0;
      user.games.forEach((game) => {
        if (game.winnerId === user.id) {
          points += 2;
        }
        points += 1;
      });
      this.achievements.forEach((achievement) => {
        if (user.achievements[achievement]) {
          points += 3;
        }
      });
      return points;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Sends the leaderboard to the user socket who requested it
   *
   * @listens Socket `leaderboard`
   *
   * @param data {} (empty)
   * @param socket Socket
   *
   * @emits Socket `leaderboard` { data: { studentId: string, username: string, avatar: string, status: 'ONLINE' | 'OFFLINE' | 'IN_GAME', points: number }[] }
   * @returns void
   */
  @SubscribeMessage('leaderboard')
  getLeaderBoard(@Body() _: {}, @ConnectedSocket() socket: Socket) {
    try {
      let points: {
        id: number;
        studentId: string;
        username: string;
        avatar: string;
        status: 'ONLINE' | 'OFFLINE' | 'IN_GAME';
        points: number;
      }[] = [];
      this.userEntity.getAll().then((allUsers) => {
        allUsers.forEach((user) => {
          if (user.username === 'Bot') return;
          points.push({
            id: user.id,
            studentId: user.studentId,
            username: user.username,
            avatar: user.avatar,
            status: user.status,
            points: this.getLeaderBoradPoints(user),
          });
        });
        points.sort((a, b) => {
          if (a.points === b.points) {
            return a.id - b.id;
          }
          return b.points - a.points;
        });
        this.updateLeaderboardAchievements(points[0].studentId);
        socket.emit('leaderboard', { data: points.slice(0, 3) });
      });
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('update/achievements')
  updateMyAchievements(@Body() data, @ConnectedSocket() socket: Socket) {
    try {
      if (!data.studentId) {
        socket.emit('update/achievements', { error: 'No studentId provided' });
        return;
      }
      this.userEntity.findOne({ studentId: data.studentId }).then((user) => {
        const achievements = {
          winFirstGame: user.achievements.winFirstGame,
          winThreeTimes: user.achievements.winThreeTimes,
          winAgainstFriend: user.achievements.winAgainstFriend,
          winAgainstBotEasy: user.achievements.winAgainstBotEasy,
          winAgainstBotMedium: user.achievements.winAgainstBotMedium,
          winAgainstBotHard: user.achievements.winAgainstBotHard,
          firstInLeaderboard: user.achievements.firstInLeaderboard,
          inviteGameInChat: user.achievements.inviteGameInChat,
          inviteGameInChannel: user.achievements.inviteGameInChannel,
        };
        socket.emit('update/achievements', { data: achievements });
      });
    } catch (e) {
      console.error(e);
    }
  }
}
