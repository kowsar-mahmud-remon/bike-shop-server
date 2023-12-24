import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICheckout } from './checkout.interface';
import { Checkout } from './checkout.model';

const createCheckout = async (data: ICheckout) => {
  const createCheckout = await Checkout.create(data);

  if (!createCheckout) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Checkout');
  }

  return createCheckout;
};

const getAllCheckouts = async () => {
  const result = await Checkout.find({});
  return result;
};

const getSingleCheckout = async (id: string) => {
  const result = await Checkout.find({ userId: id });
  return result;
};

const updateCheckout = async (id: string, payload: Partial<ICheckout>) => {
  const isExist = await Checkout.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found !');
  }

  const result = await Checkout.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCheckout = async (id: string) => {
  const isExist = await Checkout.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found !');
  }

  const deletedCheckout = await Checkout.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedCheckout;
};

export const CheckoutService = {
  createCheckout,
  getAllCheckouts,
  getSingleCheckout,
  updateCheckout,
  deleteCheckout,
};
