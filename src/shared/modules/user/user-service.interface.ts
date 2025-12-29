import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { DocumentExists } from '../../types/index.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<UserEntity>;
  findById(userId: string): Promise<UserEntity | null>;
  updateById(userId: string, dto: UpdateUserDto): Promise<UserEntity | null>;
  addToFavorites(userId: string, offerId: string): Promise<void>;
  removeFromFavorites(userId: string, offerId: string): Promise<void>;
  findFavoriteIds(userId: string): Promise<string[]>;
  findFavorites(userId: string): Promise<OfferEntity[]>;
}
