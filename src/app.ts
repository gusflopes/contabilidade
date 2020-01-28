import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import './database';

class App {
  public express: express.Application

  public constructor () {
    this.express = express();
  }

  private middlewares (): void {
    this.express.use(express.json());
    this.express.use(cors());
 }

 private routes (): void {
   this.express.use(routes);
 }
}

export default new App().express;
