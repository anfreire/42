import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/services/database/database.service';
import { $Enums, Prisma, game_mode } from '@prisma/client';
import { GameExtended, GameExtendedInclude } from '../entities.interface';

@Injectable()
export class GameEntity {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @async
   *
   * @brief Returns the game given a `Prisma.GameWhereUniqueInput`
   *
   * @param where Prisma.GameWhereUniqueInput
   *
   * @returns Promise<GameExtended | null>
   */
  async findOne(
    where: Prisma.GameWhereUniqueInput,
  ): Promise<GameExtended | null> {
    try {
      return await this.db.game.findUnique({
        where,
        include: {
          ...GameExtendedInclude,
        },
      });
    } catch (error) {
      console.error('GameEntity -> findOne -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Returns a group of games given a `Prisma.GameFindManyArgs`
   *
   * @param params Prisma.GameFindManyArgs
   *
   * @returns Promise<GameExtended[]>
   */
  async findMany(params: Prisma.GameFindManyArgs): Promise<GameExtended[]> {
    try {
      return this.db.game.findMany({
        ...params,
        include: {
          ...GameExtendedInclude,
        },
      });
    } catch (error) {
      console.error('GameEntity -> findMany -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Returns all the games
   *
   * @returns Promise<GameExtended[]>
   */
  async getAll(): Promise<GameExtended[]> {
    try {
      return this.db.game.findMany({
        include: {
          ...GameExtendedInclude,
        },
      });
    } catch (error) {
      console.error('GameEntity -> getAll -> error', error);
      return [];
    }
  }

  /**
   * @async
   *
   * @brief Creates a game given a `Prisma.GameCreateInput`
   *
   * @param data Prisma.GameCreateInput
   *
   * @returns Promise<GameExtended>
   */
  async create(data: Prisma.GameCreateInput): Promise<GameExtended> {
    try {
      return this.db.game.create({
        data,
        include: { ...GameExtendedInclude },
      });
    }
    catch (error) {
      console.error('GameEntity -> create -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Updates a game given a `Prisma.GameUpdateArgs`
   *
   * @param params Prisma.GameUpdateArgs
   *
   * @returns Promise<GameExtended>
   */
  async update(params: Prisma.GameUpdateArgs): Promise<GameExtended> {
    try {
      return this.db.game.update({
        ...params,
        include: { ...GameExtendedInclude },
      });
    } catch (error) {
      console.error('GameEntity -> update -> error', error);
      return null;
    }
    
  }

  /**
   * @async
   *
   * @brief Deletes a game given a `Prisma.GameWhereUniqueInput`
   *
   * @param where Prisma.GameWhereUniqueInput
   *
   * @returns Promise<GameExtended>
   */
  async delete(where: Prisma.GameWhereUniqueInput): Promise<GameExtended> {
    try {
      return this.db.game.delete({
        where,
        include: { ...GameExtendedInclude },
      });
    } catch (error) {
      console.error('GameEntity -> delete -> error', error);
      return null;
    }
  }

  /**
   * @async
   *
   * @brief Deletes multiple games given a `Prisma.GameWhereInput`
   *
   * @param where Prisma.GameWhereInput
   *
   * @returns Promise<Prisma.BatchPayload>
   */
  async deleteMany(where: Prisma.GameWhereInput): Promise<Prisma.BatchPayload> {
    try {
      return this.db.game.deleteMany({
        where,
      });
    } catch (error) {
      console.error('GameEntity -> deleteMany -> error', error);
      return null;
    }
  }
}
