import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import {
  AchievementsExtend,
  AchievementsExtendedInclude,
} from '../entities.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class AchievementsEntity {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @async
   *
   * @brief Returns the achievements given a `Prisma.AchievementsWhereUniqueInput`
   *
   * @param where Prisma.AchievementsWhereUniqueInput
   *
   * @returns Promise<AchievementsExtend | null>
   */
  async findOne(
    where: Prisma.AchievementsWhereUniqueInput,
  ): Promise<AchievementsExtend | null> {
    try {
      return await this.db.achievements.findUnique({
        where,
        include: {
          ...AchievementsExtendedInclude,
        },
      });
    } catch (error) {
      console.error('AchievementsEntity -> findOne -> error', error)
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Returns a group of achievements given a `Prisma.AchievementsFindManyArgs`
   *
   * @param params Prisma.AchievementsFindManyArgs
   *
   * @returns Promise<AchievementsExtend[]>
   */
  async findMany(
    params: Prisma.AchievementsFindManyArgs,
  ): Promise<AchievementsExtend[]> {
    try {
      return await this.db.achievements.findMany({
        ...params,
        include: {
          ...AchievementsExtendedInclude,
        },
      });
    } catch (error) {
      console.error('AchievementsEntity -> findMany -> error', error)
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Returns all the achievements
   *
   * @returns Promise<AchievementsExtend[]>
   */
  async getAll(): Promise<AchievementsExtend[]> {
    try {
      return this.db.achievements.findMany({
        include: {
          ...AchievementsExtendedInclude,
        },
      });
    } catch (error) {
      console.error('AchievementsEntity -> getAll -> error', error)
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Creates a new achievement given a `Prisma.AchievementsCreateInput`
   *
   * @param data Prisma.AchievementsCreateInput
   *
   * @returns Promise<AchievementsExtend>
   */
  async create(
    data: Prisma.AchievementsCreateInput,
  ): Promise<AchievementsExtend> {
    try {
      return this.db.achievements.create({
        data,
        include: { ...AchievementsExtendedInclude },
      });
    } catch (error) {
      console.error('AchievementsEntity -> create -> error', error)
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Updates an achievement given a `Prisma.AchievementsUpdateArgs`
   *
   * @param params Prisma.AchievementsUpdateArgs
   *
   * @returns Promise<AchievementsExtend>
   */
  async update(
    params: Prisma.AchievementsUpdateArgs,
  ): Promise<AchievementsExtend> {
    try {
      return this.db.achievements.update({
        ...params,
        include: { ...AchievementsExtendedInclude },
      });
    } catch (error) {
      console.error('AchievementsEntity -> update -> error', error)
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes an achievement given a `Prisma.AchievementsWhereUniqueInput`
   *
   * @param where Prisma.AchievementsWhereUniqueInput
   *
   * @returns Promise<AchievementsExtend>
   */
  async delete(
    where: Prisma.AchievementsWhereUniqueInput,
  ): Promise<AchievementsExtend> {
    try {
      return this.db.achievements.delete({
        where,
        include: { ...AchievementsExtendedInclude },
      });
    } catch (error) {
      console.error('AchievementsEntity -> delete -> error', error)
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes multiple achievements given a `Prisma.AchievementsWhereInput`
   *
   * @param where Prisma.AchievementsWhereInput
   *
   * @returns Promise<Prisma.BatchPayload>
   */
  async deleteMany(
    where: Prisma.AchievementsWhereInput,
  ): Promise<Prisma.BatchPayload> {
    try {
      return this.db.achievements.deleteMany({
        where,
      });
    } catch (error) {
      console.error('AchievementsEntity -> deleteMany -> error', error)
      return null;
    }
  }
}
