import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  const token = generateToken(
    {
      _id: result?._id,
      email: result?.email,
      role: result?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
    token: token,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const allUsers = await UserService.getAllUsers();

  if (!allUsers) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get users');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully !',
    data: allUsers,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const singleUser = await UserService.getSingleUser(id);

  if (!singleUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get user');
  }

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully !',
    data: singleUser,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedUser = await UserService.updateUser(id, updatedData);

  if (!updatedUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update user');
  }

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedUser = await UserService.deleteUser(id);

  if (!deletedUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  }

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: deletedUser,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
