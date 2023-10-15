import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/services/database/database.service';
import { Prisma } from '@prisma/client';
import { UserExtended, UserExtendedInclude } from '../entities.interface';

@Injectable()
export class UserEntity {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @async
   *
   * @brief Returns the user given a `Prisma.UserWhereUniqueInput`
   *
   * @param where Prisma.UserWhereUniqueInput
   *
   * @returns Promise<UserExtended | null>
   */
  async findOne(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserExtended | null> {
    try {
      return await this.db.user.findUnique({
        where,
        include: {
          ...UserExtendedInclude,
        },
      });
    } catch (error) {
      console.error('UserEntity -> findOne -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Returns a group of users given a `Prisma.UserFindManyArgs`
   *
   * @param params Prisma.UserFindManyArgs
   *
   * @returns Promise<UserExtended[]>
   */
  async findMany(params: Prisma.UserFindManyArgs): Promise<UserExtended[]> {
    try {
      return await this.db.user.findMany({
        ...params,
        include: {
          ...UserExtendedInclude,
        },
      });
    } catch (error) {
      console.error('UserEntity -> findMany -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Returns all the users
   *
   * @returns Promise<UserExtended[]>
   */
  async getAll(): Promise<UserExtended[]> {
    try {
      return this.db.user.findMany({
        include: {
          ...UserExtendedInclude,
        },
      });
    } catch (error) {
      console.error('UserEntity -> getAll -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Creates a user given a `Prisma.UserCreateInput`
   *
   * @param data Prisma.UserCreateInput
   *
   * @returns Promise<UserExtended>
   */
  async create(data: Prisma.UserCreateInput): Promise<UserExtended> {
    try {
      return this.db.user.create({
        data,
        include: { ...UserExtendedInclude },
      });
    } catch (error) {
      console.error('UserEntity -> create -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Updates a user given a `Prisma.UserUpdateArgs`
   *
   * @param params Prisma.UserUpdateArgs
   *
   * @returns Promise<UserExtended>
   */
  async update(params: Prisma.UserUpdateArgs): Promise<UserExtended> {
    try {
      return this.db.user.update({
        ...params,
        include: { ...UserExtendedInclude },
      });
    } catch (error) {
      console.error('UserEntity -> update -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a user given a `Prisma.UserWhereUniqueInput`
   *
   * @param where Prisma.UserWhereUniqueInput
   *
   * @returns Promise<UserExtended>
   */
  async delete(where: Prisma.UserWhereUniqueInput): Promise<UserExtended> {
    try {
      return this.db.user.delete({
        where,
        include: { ...UserExtendedInclude },
      });
    } catch (error) {
      console.error('UserEntity -> delete -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes a group of users given a `Prisma.UserWhereInput`
   *
   * @param where Prisma.UserWhereInput
   *
   * @returns Promise<Prisma.BatchPayload>
   */
  async deleteMany(where: Prisma.UserWhereInput): Promise<Prisma.BatchPayload> {
    try {
      return this.db.user.deleteMany({
        where,
      });
    } catch (error) {
      console.error('UserEntity -> deleteMany -> error', error);
      return null;
    }
  }
}
