import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { ctrWrapper } from '../middlewares/ctrWrapper.js';
import { loginUserController, logoutUserController, registerUserController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';

const authRouter = Router();
const registerHandler = ctrWrapper(registerUserController);
const loginHandler = ctrWrapper(loginUserController);
const logoutHandler = ctrWrapper(logoutUserController);

const validateRegister = validateBody(registerUserSchema);
const validateLogin = validateBody(loginUserSchema);

authRouter.post('/register', validateRegister, registerHandler);
authRouter.post('/login', validateLogin, loginHandler);
authRouter.post('/refresh-token');
authRouter.post('/logout', logoutHandler);

export default authRouter;
