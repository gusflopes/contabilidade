import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: 'Erro na requisição.' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validar o Schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Create a user with the information provided on req.body, and give back just  a few columns
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    // Right now it is finding the ID by the token provided.
    // You can only change your own user information
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
