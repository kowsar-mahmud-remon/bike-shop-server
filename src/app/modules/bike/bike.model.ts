import { Model, Schema, model } from 'mongoose';
import { IBike } from './bike.interface';

type BikeModel = Model<IBike, Record<string, unknown>>;

const BikeSchema = new Schema<IBike>(
  {
    imgUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    variations: {
      color: {
        type: [String],
        required: true,
      },
      size: {
        type: [String],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Bike = model<IBike, BikeModel>('Bike', BikeSchema);
