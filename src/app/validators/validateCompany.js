import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.string(),
      start_date: Yup.date(),
      client_code: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return true;

    // return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
