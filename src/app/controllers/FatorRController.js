import * as Yup from 'yup';
import Company from '../models/Company';
import Balance from '../models/Balance';

import { addMonth } from '../utils/MonthUtils';
import { fatorRfunction, planejar } from '../services/fatorR';

function formatCurrency(value) {
  // return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

class FatorRController {
  async index(req, res) {
    // usuario
    const { userId } = req;
    const { companyId } = req.params;
    console.log(`User: ${userId} e Company: ${companyId}`);

    const balances = await Balance.findAll({
      where: { companyId },
      order: [['competencia', 'DESC']],
      limit: 12,
    });

    console.log('Tenho que transfmar em um array de objetos');
    console.log(balances);

    const response = await fatorRfunction(balances);

    return res.status(200).json(response);
  }

  async store(req, res) {
    // usuario
    const { userId } = req;
    const { companyId } = req.params;
    console.log(`User: ${userId} e Company: ${companyId}`);

    const balances = await Balance.findAll({
      where: { companyId },
      order: [['competencia', 'DESC']],
      limit: 12,
    });

    const response = await fatorRfunction(balances);

    const { receita, folha } = req.body;

    const planResponse = planejar(response.filtered, receita, folha);

    return res.status(200).json(planResponse);
  }
}

export default new FatorRController();
