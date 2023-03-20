import { Router } from 'express';
import userAdd from '@controllers/v1/users/user_add.controller';

const userRouter = Router();

userRouter.post('/add', userAdd);

export default userRouter;
