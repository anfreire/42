import { Injectable } from '@nestjs/common';
import { Chat, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/services/database/database.service';
import { ChatExtended, ChatExtendedInclude } from '../entities.interface';

@Injectable()
export class ChatEntity {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @async
   *
   * @brief Returns the chat given a `Prisma.ChatWhereUniqueInput`
   *
   * @param where Prisma.ChatWhereUniqueInput
   *
   * @returns Promise<ChatExtended | null>
   */
  async findOne(
    where: Prisma.ChatWhereUniqueInput,
  ): Promise<ChatExtended | null> {
    try {
      return this.db.chat.findUnique({
        where,
        include: {
          ...ChatExtendedInclude,
        },
      });
    } catch (error) {
      console.error('ChatEntity -> findOne -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Returns a group of chats given a `Prisma.ChatFindManyArgs`
   *
   * @param params Prisma.ChatFindManyArgs
   *
   * @returns Promise<ChatExtended[]>
   */
  async findMany(params: Prisma.ChatFindManyArgs): Promise<ChatExtended[]> {
    try {
      return this.db.chat.findMany({
        ...params,
        include: {
          ...ChatExtendedInclude,
        },
      });
    } catch (error) {
      console.error('ChatEntity -> findMany -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Returns all the chats
   *
   * @returns Promise<ChatExtended[]>
   */
  async getAll(): Promise<ChatExtended[]> {
    try {
      return this.db.chat.findMany({
        include: {
          ...ChatExtendedInclude,
        },
      });
    } catch (error) {
      console.error('ChatEntity -> getAll -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Creates a chat given a `Prisma.ChatCreateInput`
   *
   * @param data Prisma.ChatCreateInput
   *
   * @returns Promise<ChatExtended>
   */
  async create(data: Prisma.ChatCreateInput): Promise<ChatExtended> {
    try {
      return this.db.chat.create({
        data,
        include: { ...ChatExtendedInclude },
      });
    } catch (error) {
      console.error('ChatEntity -> create -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Updates a chat given a `Prisma.ChatUpdateArgs`
   *
   * @param params Prisma.ChatUpdateArgs
   *
   * @returns Promise<ChatExtended>
   */
  async update(params: Prisma.ChatUpdateArgs): Promise<ChatExtended> {
    try {
      return this.db.chat.update({
        ...params,
        include: { ...ChatExtendedInclude },
      });
    } catch (error) {
      console.error('ChatEntity -> update -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a chat given a `Prisma.ChatWhereUniqueInput`
   *
   * @param where Prisma.ChatWhereUniqueInput
   *
   * @returns Promise<Chat>
   */
  async delete(where: Prisma.ChatWhereUniqueInput): Promise<Chat> {
    try {
      return this.db.chat.delete({
        where,
        include: { ...ChatExtendedInclude },
      });
    } catch (error) {
      console.error('ChatEntity -> delete -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a group of chats given a `Prisma.ChatWhereInput`
   *
   * @param where Prisma.ChatWhereInput
   *
   * @returns Promise<Prisma.BatchPayload>
   */
  async deleteMany(where: Prisma.ChatWhereInput): Promise<Prisma.BatchPayload> {
    try {
      return this.db.chat.deleteMany({
        where,
      });
    } catch (error) {
      console.error('ChatEntity -> deleteMany -> error', error);
      return null;
    }
  }
}
