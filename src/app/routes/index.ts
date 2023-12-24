import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { CheckoutRoutes } from '../modules/checkout/checkout.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bike',
    route: BikeRoutes,
  },
  {
    path: '/checkout',
    route: CheckoutRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
