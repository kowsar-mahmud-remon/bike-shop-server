import { z } from 'zod';

export const roleEnum = ['user'];

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    email: z.string({
      required_error: 'Email is required',
    }),

    password: z.string({
      required_error: 'Password is required',
    }),

    imgUrl: z
      .string({
        required_error: 'Img Url is required',
      })
      .optional(),

    role: z.enum([...roleEnum] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
