import { z } from 'zod';

const createBikeZodSchema = z.object({
  body: z.object({
    imgUrl: z.string({
      required_error: 'ImgUrl is required',
    }),
    title: z.string({
      required_error: 'Title is required',
    }),

    variations: z.array(
      z.object({
        color: z.string({
          required_error: 'Color is required',
        }),
        size: z.string({
          required_error: 'Size is required',
        }),
      })
    ),
  }),
});

export const BikeValidation = {
  createBikeZodSchema,
};
