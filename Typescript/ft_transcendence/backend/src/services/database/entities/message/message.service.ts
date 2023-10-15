import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/services/database/database.service';
import { MessageExtended, MessageExtendedInclude } from '../entities.interface';

@Injectable()
export class MessageEntity {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @async
   *
   * @brief Returns the message given a `Prisma.MessageWhereUniqueInput`
   *
   * @param where Prisma.MessageWhereUniqueInput
   *
   * @returns Promise<MessageExtended | null>
   */
  async findOne(
    where: Prisma.MessageWhereUniqueInput,
  ): Promise<MessageExtended | null> {
    try {
      return await this.db.message.findUnique({
        where,
        include: {
          ...MessageExtendedInclude,
        },
      });
    } catch (error) {
      console.error('MessageEntity -> findOne -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Returns a group of messages given a `Prisma.MessageFindManyArgs`
   *
   * @param params Prisma.MessageFindManyArgs
   *
   * @returns Promise<MessageExtended[]>
   */
  async findMany(
    params: Prisma.MessageFindManyArgs,
  ): Promise<MessageExtended[]> {
    try {
      return await this.db.message.findMany({
        ...params,
        include: {
          ...MessageExtendedInclude,
        },
      });
    } catch (error) { 
      console.error('MessageEntity -> findMany -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Returns all the messages
   *
   * @returns Promise<MessageExtended[]>
   */
  async getAll(): Promise<MessageExtended[]> {
    try {
      return this.db.message.findMany({
        include: {
          ...MessageExtendedInclude,
        },
      });
    } catch (error) {
      console.error('MessageEntity -> getAll -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Creates a message given a `Prisma.MessageCreateInput`
   *
   * @param data Prisma.MessageCreateInput
   *
   * @returns Promise<MessageExtended>
   */
  async create(data: Prisma.MessageCreateInput): Promise<MessageExtended> {
    try {
      return this.db.message.create({
        data,
        include: { ...MessageExtendedInclude },
      });
    } catch (error) {
      console.error('MessageEntity -> create -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Updates a message given a `Prisma.MessageUpdateArgs`
   *
   * @param params Prisma.MessageUpdateArgs
   *
   * @returns Promise<MessageExtended>
   */
  async update(params: Prisma.MessageUpdateArgs): Promise<MessageExtended> {
    try {
      return this.db.message.update({
        ...params,
        include: { ...MessageExtendedInclude },
      });
    } catch (error) {
      console.error('MessageEntity -> update -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a message given a `Prisma.MessageWhereUniqueInput`
   *
   * @param where Prisma.MessageWhereUniqueInput
   *
   * @returns Promise<Message>
   */
  async delete(where: Prisma.MessageWhereUniqueInput): Promise<MessageExtended> {
    try {
      return this.db.message.delete({
        where,
        include: { ...MessageExtendedInclude },
      });
    } catch (error) {
      console.error('MessageEntity -> delete -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a group of messages given a `Prisma.MessageDeleteManyArgs`
   *
   * @param params Prisma.MessageDeleteManyArgs
   *
   * @returns Promise<Prisma.BatchPayload>
   */
  async deleteMany(
    params: Prisma.MessageDeleteManyArgs,
  ): Promise<Prisma.BatchPayload> {
    try {
      return this.db.message.deleteMany(params);
    } catch (error) {
      console.error('MessageEntity -> deleteMany -> error', error);
      return null;
    }
  }
}
