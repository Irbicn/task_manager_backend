import { Router } from 'express';
import authRouter from './v1/auth.routes';
import taskRouter from './v1/tasks.routes';
import userRouter from './v1/users.routes';

const mainRouter = Router();

mainRouter.use('/api/v1/tasks', taskRouter);
mainRouter.use('/api/v1/auth', authRouter);
mainRouter.use('/api/v1/users', userRouter);

export default mainRouter;
