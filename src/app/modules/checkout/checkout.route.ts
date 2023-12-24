import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CheckoutController } from './checkout.controller';
import { CheckoutValidation } from './checkout.validation';
const router = express.Router();

router.get(
  '/:id',

  CheckoutController.getSingleCheckout
);

router.get(
  '/',

  CheckoutController.getAllCheckouts
);

router.post(
  '/create-checkout',
  validateRequest(CheckoutValidation.createCheckoutZodSchema),

  CheckoutController.createCheckout
);

router.delete('/:id', CheckoutController.deleteCheckout);

router.patch('/:id', CheckoutController.updateCheckout);

export const CheckoutRoutes = router;
