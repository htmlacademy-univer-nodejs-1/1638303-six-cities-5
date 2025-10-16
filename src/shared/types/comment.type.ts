import { User } from './user.type.js';

export interface Comment {
  text: string;
  publishDate: Date;
  rating: number;
  user: User;
}

