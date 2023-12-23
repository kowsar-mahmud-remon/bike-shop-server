import { Types } from 'mongoose';
import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IUserAccessTokenData = {
  _id: Types.ObjectId;
  email: string;
  role: string;
};
