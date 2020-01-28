import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  /*
  console.log(req.params);
  console.log(req.headers);
  console.log(req.url);
  */

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // Descartando o Bearer e pegando apenas o token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    console.log(`userId: ${decoded.id} autenticado`);

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid.' });
  }
};
