import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginUserData = req.body;
  console.log({ loginUserData });

  const result = await AuthService.loginUser(loginUserData);

  const token = generateToken(
    {
      _id: result?._id,
      email: result?.email,
      role: result?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
    token: token,
  });
});

export const AuthController = {
  loginUser,
};
