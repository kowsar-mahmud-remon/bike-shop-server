import jwt, { Secret } from 'jsonwebtoken';
import { IUserAccessTokenData } from '../interfaces/common';

export const generateToken = (
  data: IUserAccessTokenData,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(data, secret, {
    expiresIn: expireTime,
  });
  return token;
};
