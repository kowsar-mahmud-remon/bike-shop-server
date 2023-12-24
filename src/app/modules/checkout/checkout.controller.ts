import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICheckout } from './checkout.interface';
import { CheckoutService } from './checkout.service';

const createCheckout = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CheckoutService.createCheckout(data);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checkout created successfully!',
    data: result,
  });
});

const getAllCheckouts = catchAsync(async (req: Request, res: Response) => {
  const allCheckouts = await CheckoutService.getAllCheckouts();

  if (!allCheckouts) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Checkout');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checkout fetched successfully !',
    data: allCheckouts,
  });
});

const getSingleCheckout = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const singleCheckout = await CheckoutService.getSingleCheckout(id);

  if (!singleCheckout) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Checkout');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checkout fetched successfully !',
    data: singleCheckout,
  });
});

const updateCheckout = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedCheckout = await CheckoutService.updateCheckout(id, updatedData);

  if (!updatedCheckout) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Checkout');
  }

  sendResponse<ICheckout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checkout updated successfully !',
    data: updatedCheckout,
  });
});

const deleteCheckout = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedCheckout = await CheckoutService.deleteCheckout(id);

  if (!deletedCheckout) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Checkout');
  }

  sendResponse<ICheckout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checkout deleted successfully !',
    data: deletedCheckout,
  });
});

export const CheckoutController = {
  createCheckout,
  getAllCheckouts,
  getSingleCheckout,
  updateCheckout,
  deleteCheckout,
};
