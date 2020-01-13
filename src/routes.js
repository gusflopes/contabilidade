import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CompanyController from './app/controllers/CompanyController';
import SessionController from './app/controllers/SessionController';
import BalanceController from './app/controllers/BalanceController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Public Routes
routes.get('/', (req, res) => res.json({ message: 'Hello World' }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middlewares
routes.use(authMiddleware);

// Private Routes
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/companies', CompanyController.index);
routes.post('/companies', CompanyController.store);

routes.get('/:companyId/balance', BalanceController.index);
routes.post('/:companyId/balance', BalanceController.store);

export default routes;
