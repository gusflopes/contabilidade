import * as Yup from 'yup';
import Company from '../models/Company';
import User from '../models/User';

class CompanyController {
  async index(req, res) {
    try {
      const companies = await Company.findAll();
      return res.status(200).json(companies);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro Interno' });
    }
  }

  async show(req, res) {
    return res.status(200).json({ message: 'OK' });
  }

  async store(req, res) {
    // validacao
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação. ' });
    }

    const { name, cnpj } = req.body;

    // verifica se ja existe?
    const companyExists = await Company.findOne({
      where: {
        name,
      },
    });
    if (companyExists) {
      return res.status(401).json({
        error: 'Empresa já cadastrada',
        company: {
          id: companyExists.id,
          name: companyExists.name,
          cnpj: companyExists.cnpj,
          slug: companyExists.slug,
        },
      });
    }

    // criar
    const companySave = await Company.create({
      name,
      cnpj,
      user_id: req.userId,
    });
    console.log(companySave);

    // Buscar dados
    const company = await Company.findByPk(companySave.id);

    return res.status(201).json(company);
  }

  async update(req, res) {
    return res.status(200).json({ message: 'OK' });
  }

  async delete(req, res) {
    return res.status(200).json({ message: 'OK' });
  }
}

export default new CompanyController();
