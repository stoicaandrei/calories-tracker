import { UserModel } from '@models';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { checkInputErrors } from '../middlewares/input.middlewares';

const authRouter = Router();

authRouter.post(
  '/signin',
  body('email').isEmail(),
  body('password').isLength({ min: 4 }),
  checkInputErrors,
  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne(
      { email },
      'password roles caloriesGoal'
    );

    if (!user) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign(
      { _id: user._id, roles: user.roles, caloriesGoal: user.caloriesGoal },
      'secret',
      {
        expiresIn: 86400 * 14, // 2 weeks
      }
    );

    res.cookie('AuthToken', token);
    res.send({
      message: 'Successfully signed in!',
    });
  }
);

authRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 4 }),
  checkInputErrors,
  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: 'Please provide an email and password!',
      });
    }

    const user = await UserModel.findOne(
      { email },
      'password roles caloriesGoal'
    );

    if (user) {
      return res.status(401).send({
        message: 'User already exists!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        _id: newUser._id,
        roles: newUser.roles,
        caloriesGoal: newUser.caloriesGoal,
      },
      'secret',
      {
        expiresIn: 86400 * 14, // 2 weeks
      }
    );

    res.cookie('AuthToken', token);
    res.send({
      message: 'Successfully signed up!',
    });
  }
);

export { authRouter };
