import { prop, modelOptions, getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop()
  public avatarUrl?: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, type: () => String, enum: UserType })
  public type!: UserType;

  @prop({ default: [], type: () => [String] })
  public favorites!: string[];

  public verifyPassword(password: string, salt: string): boolean {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
