import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (data: IBike) => {
  const createBike = await Bike.create(data);

  if (!createBike) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Bike');
  }

  return createBike;
};

const getAllBikes = async () => {
  const result = await Bike.find({});
  return result;
};

const getSingleBike = async (id: string) => {
  const result = await Bike.findOne({ _id: id });
  return result;
};

const updateBike = async (id: string, payload: Partial<IBike>) => {
  const isExist = await Bike.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bike not found !');
  }

  const result = await Bike.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBike = async (id: string) => {
  const isExist = await Bike.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bike not found !');
  }

  const deletedBike = await Bike.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedBike;
};

export const BikeService = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
