import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Company from '../models/Company';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // Descartando o Bearer e pegando apenas o token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    console.log(req.userId);

    const companyId = req.params;

    console.log(companyId);

    if (!companyId) {
      console.log('sem companyId no req.params');
      return next();
    }

    try {
      const company = await Company.findOne({
        where: { id: companyId, owner_id: decoded.id },
      });
      console.log(company);

      if (company) {
        return next();
      }
    } catch (err) {
      return res.status(401).json({
        error: 'Usuário não term permissão para acessar essa empresa.',
      });
    }

    // Atribuir uma permissão
    // req.authorized = { companyId: company_id, userId: req.userId };
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid.' });
  }
};
