import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { ctrWrapper } from '../middlewares/ctrWrapper.js';
import {
  getOAuthUrlController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  resetPasswordEmailController,
  verifyGoogleOAuthController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { sendResetPasswordEmailSchema } from '../validation/sendResetPasswordEmailSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';
import { validationGoogleOAuthSchema } from '../validation/validationGoogleOAuthSchema.js';

const authRouter = Router();
const registerHandler = ctrWrapper(registerUserController);
const loginHandler = ctrWrapper(loginUserController);
const logoutHandler = ctrWrapper(logoutUserController);
const refreshTokenHandler = ctrWrapper(refreshTokenController);
const resetPasswordEmailHandler = ctrWrapper(resetPasswordEmailController);
const resetPasswordHandler = ctrWrapper(resetPasswordController);
const getOAuthUrlHandler = ctrWrapper(getOAuthUrlController);
const verifyGoogleOAuthHandler = ctrWrapper(verifyGoogleOAuthController);

const validateRegister = validateBody(registerUserSchema);
const validateLogin = validateBody(loginUserSchema);
const validateReset = validateBody(sendResetPasswordEmailSchema);
const validateResetPassword = validateBody(resetPasswordSchema);
const validateVerifyGoogleOAuthHandler = validateBody(validationGoogleOAuthSchema);

authRouter.post('/register', validateRegister, registerHandler);
authRouter.post('/login', validateLogin, loginHandler);
authRouter.post('/refresh-token', refreshTokenHandler);
authRouter.post('/logout', logoutHandler);
authRouter.post(
  '/reset-password-email',
  validateReset,
  resetPasswordEmailHandler,
);

authRouter.post(
  '/reset-password',
  validateResetPassword,
  resetPasswordHandler,
);

authRouter.post(
  '/get-oauth-url',
  getOAuthUrlHandler
);
authRouter.post(
  '/verify-google-oauth',
  validateVerifyGoogleOAuthHandler,
  verifyGoogleOAuthHandler
);


export default authRouter;
