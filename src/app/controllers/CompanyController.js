import * as Yup from 'yup';
import Company from '../models/Company';
import User from '../models/User';

import validateCompany from '../validators/validateCompany';

class CompanyController {
  async index(req, res) {
    const { userId } = req;

    try {
      const companies = await Company.findAll({ where: { owner_id: userId } });
      return res.status(200).json(companies);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro Interno' });
    }
  }

  async show(req, res) {
    const { userId, companyId, company } = req.authorized;

    return res.status(200).json(company);
  }

  async store(req, res) {
    const { userId } = req;
    const { name, cnpj, start_date, client_code } = req.body;

    // verifica se ja existe?
    const companyExists = await Company.findOne({
      where: {
        name,
        owner_id: userId,
      },
    });
    if (companyExists) {
      return res.status(401).json({
        error: 'Empresa já cadastrada',
        company: {
          id: companyExists.id,
          name: companyExists.name,
          cnpj: companyExists.cnpj,
          start_date: companyExists.start_date,
          slug: companyExists.slug,
        },
      });
    }

    // criar
    const companySave = await Company.create({
      name,
      cnpj,
      start_date,
      client_code,
      owner_id: req.userId,
    });

    // Buscar dados
    const company = await Company.findByPk(companySave.id);

    return res.status(201).json(company);
  }

  async update(req, res, next) {
    const { userId, companyId, company } = req.authorized;

    return res.status(200).json({ validated });
  }

  async delete(req, res) {
    const { userId, companyId, company } = req.authorized;
    await Company.destroy({ where: { id: companyId } });

    return res.status(200).json({ message: 'Registro deletado.' });
  }
}

export default new CompanyController();
