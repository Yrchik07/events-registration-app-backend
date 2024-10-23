import { createUser, loginUser, logoutUser } from '../services/auth.js';

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

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });

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

  res.status(204).json({
    status: 204,
    message: 'User is logged out!',
    data: {},
  });
};
