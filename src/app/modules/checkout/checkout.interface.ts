import { Types } from 'mongoose';

export type ICheckout = {
  name: string;
  imgUrl: string;
  userId: Types.ObjectId;
};
