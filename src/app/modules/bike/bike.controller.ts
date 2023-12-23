import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBike } from './bike.interface';
import { BikeService } from './bike.service';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BikeService.createBike(data);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike created successfully!',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const allBikes = await BikeService.getAllBikes();

  if (!allBikes) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Bikes');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes fetched successfully !',
    data: allBikes,
  });
});

const getSingleBike = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const singleBike = await BikeService.getSingleBike(id);

  if (!singleBike) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Bike');
  }

  sendResponse<IBike>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike fetched successfully !',
    data: singleBike,
  });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedBike = await BikeService.updateBike(id, updatedData);

  if (!updatedBike) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Bike');
  }

  sendResponse<IBike>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike updated successfully !',
    data: updatedBike,
  });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedBike = await BikeService.deleteBike(id);

  if (!deletedBike) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Bike');
  }

  sendResponse<IBike>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike deleted successfully !',
    data: deletedBike,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
