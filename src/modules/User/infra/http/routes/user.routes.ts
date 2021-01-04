import { Router } from 'express';
import UserService from '@modules/User/services/UserService'
import { container } from 'tsyringe';

const userRouter = Router();

userRouter.post('/', async (req, res) => {

  try {
    const { nome, email, senha } = req.body;


    const userService = container.resolve(UserService);


    const user = await userService.save({ nome, email, senha });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
});
export default userRouter;
