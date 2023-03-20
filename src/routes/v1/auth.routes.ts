import login from '@controllers/v1/auth/login.controller';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', login);

export default authRouter;
