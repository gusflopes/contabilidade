import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import permissionMiddleware from './app/middlewares/permission';

import UserController from './app/controllers/UserController';
import CompanyController from './app/controllers/CompanyController';
import SessionController from './app/controllers/SessionController';
import BalanceController from './app/controllers/BalanceController';
import FatorRController from './app/controllers/FatorRController';

import validateCompany from './app/validators/validateCompany';

const routes = new Router();

// Public Routes
routes.get('/', (req, res) => res.json({ message: 'Hello World' }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Authenticate User
routes.use(authMiddleware);

// Private Routes
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/companies', CompanyController.index);
routes.post('/companies', validateCompany, CompanyController.store);
routes.get(
  '/companies/:companyId',
  permissionMiddleware,
  CompanyController.show
);
routes.put(
  '/companies/:companyId',
  permissionMiddleware,
  validateCompany,
  CompanyController.update
);
routes.delete(
  '/companies/:companyId',
  permissionMiddleware,
  CompanyController.delete
);

routes.get(
  '/:companyId/balance',
  permissionMiddleware,
  BalanceController.index
);
routes.post(
  '/:companyId/balance',
  permissionMiddleware,
  BalanceController.store
);

routes.get('/:companyId/fatorR', permissionMiddleware, FatorRController.index);
routes.get('/:companyId/fatorR2', permissionMiddleware, FatorRController.store);

export default routes;
