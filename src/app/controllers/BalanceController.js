import * as Yup from 'yup';
import Company from '../models/Company';
import Balance from '../models/Balance';

class BalanceController {
  async index(req, res) {
    // usuario
    const { userId } = req;
    const { companyId } = req.params;
    console.log(`User: ${userId} e Company: ${companyId}`);

    // Verificar se a Company pertence ao usuário
    const balances = await Balance.findAll({ where: { companyId } });

    return res.status(200).json(balances);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      competencia: Yup.string()
        .required()
        .length(7)
        .matches(/[\d]{4}\/0[1-9]|1[0-2]/, 'Erro!!!'),
      receita: Yup.number().required(),
      folha: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação. ' });
    }

    // Validacao da competencia (apenas 01 a 12)

    const { competencia, receita, folha } = req.body;
    const { companyId } = req.params;
    console.log(companyId);

    // Verificar se já existe cadastrada aquela competência
    const balanceExists = await Balance.findOne({
      where: { competencia, company_id: companyId },
    });
    if (balanceExists) {
      console.log(balanceExists);
      return res.status(401).json({
        error: 'Competência já cadastrada, utilize a rota de edição.',
      });
    }

    // Verificar falha na sequência
    // Buscar a ultima competência cadastrada
    const lastBalance = await Balance.findOne({
      order: [['competencia', 'DESC']],
    });
    console.log(lastBalance);
    return res.json(lastBalance);
    // Adicionar um mês na resposta
    // Se resposta != competencia a cadastrar => erro!

    // Ver para substituir para método findOrCreate
    const balance = await Balance.create({
      competencia,
      recBruta: receita,
      despFolha: folha,
      company_id: companyId,
    });

    // console.log(balance);

    return res.status(201).json(balance);
  }
}

export default new BalanceController();
