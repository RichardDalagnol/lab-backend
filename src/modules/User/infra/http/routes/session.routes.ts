import { Router } from 'express';
import { container } from 'tsyringe';
import UserService from '@modules/User/services/UserService'

const authRouter = Router();

authRouter.post('/', async (req, res) => {

  try {
    const { email, senha } = req.body;

    const userService = container.resolve(UserService);

    const user = await userService.auth({ email, senha });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
});

export default authRouter;