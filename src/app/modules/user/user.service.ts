import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { hashedPassword } from '../../../shared/hashPassword';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  const { email, password } = user;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const hashPass = await hashedPassword(password);

  const newUser = {
    ...user,
    password: hashPass,
  };

  const createUser = await User.create(newUser);

  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  return createUser;
};

const getAllUsers = async () => {
  const user = await User.find({ role: 'user' });
  return user;
};

const getSingleUser = async (id: string) => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string) => {
  // check if the user is exist
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const deletedUser = await User.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedUser;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
