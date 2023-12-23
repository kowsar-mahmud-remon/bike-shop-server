import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeController } from './bike.controller';
import { BikeValidation } from './bike.validation';
const router = express.Router();

router.get(
  '/:id',

  BikeController.getSingleBike
);

router.get(
  '/',

  BikeController.getAllBikes
);

router.post(
  '/create-bike',
  validateRequest(BikeValidation.createBikeZodSchema),

  BikeController.createBike
);

router.delete('/:id', BikeController.deleteBike);

router.patch('/:id', BikeController.updateBike);

export const BikeRoutes = router;
