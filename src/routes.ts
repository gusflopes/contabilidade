import { Router } from 'express';

import BalanceController from './app/controllers/BalanceController';
import CompanyController from './app/controllers/CompanyController';
import FatorRController from './app/controllers/FatorRController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import permissionMiddleware from './app/middlewares/permission';

const routes = Router();

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
routes.post('/companies', CompanyController.store);

// Permission to acess Company Information
// routes.use(permissionMiddleware);
// não funcionou como middleware assim pq não tive acesso à req.params

routes.get(
  '/companies/:companyId',
  permissionMiddleware,
  CompanyController.show
);

routes.put('/companies/:companyId', CompanyController.update);
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
