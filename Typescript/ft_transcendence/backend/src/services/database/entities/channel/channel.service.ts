import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/services/database/database.service';
import { Prisma } from '@prisma/client';
import {
  ChannelExtended,
  ChannelExtendedInclude,
} from '../entities.interface';

@Injectable()
export class ChannelEntity {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @async
   *
   * @brief Returns the channel given a `Prisma.ChannelWhereUniqueInput`
   *
   * @param where Prisma.ChannelWhereUniqueInput
   *
   * @returns Promise<ChannelExtended | null>
   */
  async findOne(
    where: Prisma.ChannelWhereUniqueInput,
  ): Promise<ChannelExtended | null> {
    try {
      return await this.db.channel.findUnique({
        where,
        include: {
          ...ChannelExtendedInclude,
        },
      });
    } catch (error) {
      console.error('ChannelEntity -> findOne -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Returns a group of channels given a `Prisma.ChannelFindManyArgs`
   *
   * @param params Prisma.ChannelFindManyArgs
   *
   * @returns Promise<ChannelExtended[]>
   */
  async findMany(
    params: Prisma.ChannelFindManyArgs,
  ): Promise<ChannelExtended[]> {
    try {
      return await this.db.channel.findMany({
        ...params,
        include: {
          ...ChannelExtendedInclude,
        },
      });
    } catch (error) {
      console.error('ChannelEntity -> findMany -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Returns all the channels
   *
   * @returns Promise<ChannelExtended[]>
   */
  async getAll(): Promise<ChannelExtended[]> {
    try {
      return this.db.channel.findMany({
        include: {
          ...ChannelExtendedInclude,
        },
      });
    } catch (error) {
      console.error('ChannelEntity -> getAll -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Creates a channel given a `Prisma.ChannelCreateInput`
   * 
   * @param data Prisma.ChannelCreateInput
   */
  async create(data: Prisma.ChannelCreateInput): Promise<ChannelExtended> {
    try {
      return this.db.channel.create({
        data,
        include: { ...ChannelExtendedInclude },
      });
    }
    catch (error) {
      console.error('ChannelEntity -> create -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Updates a channel given a `Prisma.ChannelUpdateArgs`
   *
   * @param params Prisma.ChannelUpdateArgs
   *
   * @returns Promise<ChannelExtended>
   */
  async update(params: Prisma.ChannelUpdateArgs): Promise<ChannelExtended> {
    try {
      return this.db.channel.update({
        ...params,
        include: { ...ChannelExtendedInclude },
      });
    } catch (error) {
      console.error('ChannelEntity -> update -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a channel given a `Prisma.ChannelWhereUniqueInput`
   *
   * @param where Prisma.ChannelWhereUniqueInput
   *
   * @returns Promise<ChannelExtended>
   */
  async delete(
    where: Prisma.ChannelWhereUniqueInput,
  ): Promise<ChannelExtended> {
    try {
      return this.db.channel.delete({
        where,
        include: { ...ChannelExtendedInclude },
      });
    } catch (error) {
      console.error('ChannelEntity -> delete -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a group of channels given a `Prisma.ChannelWhereInput`
   *
   * @param where Prisma.ChannelWhereInput
   *
   * @returns Promise<Prisma.BatchPayload>
   */
  async deleteMany(
    where: Prisma.ChannelWhereInput,
  ): Promise<Prisma.BatchPayload> {
    try {
      return this.db.channel.deleteMany({
        where,
      });
    } catch (error) {
      console.error('ChannelEntity -> deleteMany -> error', error);
      return null;
    }
  }
}
