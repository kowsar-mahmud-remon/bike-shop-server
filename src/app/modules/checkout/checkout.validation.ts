import { z } from 'zod';

const createCheckoutZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    imgUrl: z.string({
      required_error: 'ImgUrl is required',
    }),
    userId: z.string({
      required_error: 'UserId is required',
    }),
  }),
});

export const CheckoutValidation = {
  createCheckoutZodSchema,
};
