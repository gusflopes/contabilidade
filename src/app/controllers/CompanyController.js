import * as Yup from 'yup';
import Company from '../models/Company';
import User from '../models/User';

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
    // console.log(req.authorized);

    // const response = await permissionMiddleware(userId, companyId, res);
    console.log(userId, companyId);

    return res.status(200).json(company);
  }

  async store(req, res) {
    // validacao
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.string(),
      client_code: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação. ' });
    }

    const { userId } = req;
    const { name, cnpj, client_code } = req.body;

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
          slug: companyExists.slug,
        },
      });
    }

    // criar
    const companySave = await Company.create({
      name,
      cnpj,
      client_code,
      owner_id: req.userId,
    });
    console.log(companySave);

    // Buscar dados
    const company = await Company.findByPk(companySave.id);

    return res.status(201).json(company);
  }

  async update(req, res) {
    const { userId, companyId, company } = req.authorized;
    return res.status(200).json({ message: 'OK' });
  }

  async delete(req, res) {
    const { userId, companyId, company } = req.authorized;
    await Company.destroy({ where: { id: companyId } });

    return res.status(200).json({ message: 'Registro deletado.' });
  }
}

export default new CompanyController();
