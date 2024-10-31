import { createUser, loginUser, logoutUser, refreshSession, sendResetPassword} from '../services/auth.js';
import { setupSessionCookies } from '../utils/session.js';

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);
  res.json({
    status: 200,
    message: 'User is created!',
    data: { user },
  });
};


export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'User is logged in!',
    data: { accessToken: session.accessToken},
  });
};

export const logoutUserController = async (req, res) => {
 await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
 });

 res.clearCookie('sessionId');
 res.clearCookie('sessionToken');

  res.status(204).send();
  // res.status(204).json({
  //   status: 204,
  //   message: 'User is logged out!',
  //   data: {},
  // });
};

export const refreshTokenController = async (req, res) => {
  const {sessionId, sessionToken} = req.cookies;
  const session = await refreshSession({sessionId, sessionToken});

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Token refreshed successfully!',
    data: { accessToken: session.accessToken},
  });
};

export const resetPasswordEmailController = async (req, res) => {
  await sendResetPassword(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};