import Company from '../models/Company';

export default async (req, res, next) => {
  const { userId } = req;
  const { companyId } = req.params;
  console.warn(`userId: ${userId} e companyId: ${companyId}`);

  const company = await Company.findOne({
    where: { id: companyId, owner_id: userId },
  });

  if (!company) {
    return res
      .status(401)
      .json({ error: 'Usuário não tem permissão para acessar essa empresa.' });
  }

  console.log(`Usuário tem autorização para acessar company: ${companyId}`);

  req.authorized = { companyId, userId, company };

  return next();
};
