import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { matchPassword } from '../../../shared/matchPassword';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  console.log(isUserExist);

  const isPasswordMatched = await matchPassword(
    password,
    isUserExist?.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, 'Wrong Password');
  }

  return isUserExist;
};

export const AuthService = {
  loginUser,
};
