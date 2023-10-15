import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user/user.service';
import { ChannelEntity } from '../entities/channel/channel.service';
import botAvatar from './avatars/bot.avatar';
import lobbyAvatar from './avatars/lobby.avatar';
import { AchievementsEntity } from '../entities/achievements/achievements.service';

@Injectable()
export class InitService {
  constructor(
    private readonly users: UserEntity,
    private readonly channels: ChannelEntity,
    private readonly achievements: AchievementsEntity,
  ) {
    try {
      this.init();
    } catch (e) {
      console.error(e);
    }
  }

  async createBot() {
    try {
      if (await this.users.findOne({ username: 'Bot' })) return;
      const achievements = await this.achievements.create({
        winFirstGame: true,
        winThreeTimes: true,
        winAgainstFriend: true,
        winAgainstBotEasy: true,
        winAgainstBotMedium: true,
        winAgainstBotHard: true,
        firstInLeaderboard: true,
        inviteGameInChat: true,
        inviteGameInChannel: true,
      });
      await this.users.create({
        socket: 'Bot',
        username: 'Bot',
        studentId: '0',
        avatar: botAvatar,
        twoFA: 'NONE',
        achievements: {
          connect: {
            id: achievements.id,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createLobby() {
    try {
      if (await this.channels.findOne({ name: 'Transcendence Lobby' })) return;
      await this.channels.create({
        name: 'Transcendence Lobby',
        avatar: lobbyAvatar,
        owner: {
          connect: {
            username: 'Bot',
          },
        },
        messages: {
          create: {
            content: 'Welcome to Transcendence Lobby!',
            sender: {
              connect: {
                username: 'Bot',
              },
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async init() {
    try {
      await this.createBot();
      await this.createLobby();
    } catch (e) {
      console.error(e);
    }
  }
}
