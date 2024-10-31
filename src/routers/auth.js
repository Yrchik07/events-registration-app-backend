import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { ctrWrapper } from '../middlewares/ctrWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordEmailController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { sendResetPasswordEmailSchema } from '../validation/sendResetPasswordEmailSchema.js';

const authRouter = Router();
const registerHandler = ctrWrapper(registerUserController);
const loginHandler = ctrWrapper(loginUserController);
const logoutHandler = ctrWrapper(logoutUserController);
const refreshTokenHandler = ctrWrapper(refreshTokenController);
const resetPasswordEmailHandler = ctrWrapper(resetPasswordEmailController);

const validateRegister = validateBody(registerUserSchema);
const validateLogin = validateBody(loginUserSchema);
const validateReset = validateBody(sendResetPasswordEmailSchema);

authRouter.post('/register', validateRegister, registerHandler);
authRouter.post('/login', validateLogin, loginHandler);
authRouter.post('/refresh-token', refreshTokenHandler);
authRouter.post('/logout', logoutHandler);
authRouter.post(
  '/reset-password-email',
  validateReset,
  resetPasswordEmailHandler,
);

export default authRouter;
