import { Model, Schema, model } from 'mongoose';
import { ICheckout } from './checkout.interface';

type CheckoutModel = Model<ICheckout, Record<string, unknown>>;

const CheckoutSchema = new Schema<ICheckout>(
  {
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Checkout = model<ICheckout, CheckoutModel>(
  'Checkout',
  CheckoutSchema
);
