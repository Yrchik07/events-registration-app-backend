import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/session.js';
import { createSession } from '../utils/session.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';
import { sendMail } from '../utils/sendMail.js';

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(
      409,
      'User with this email is already present in database!',
    );
  }

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) {
    throw createHttpError(401, 'Unauthorized!');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const refreshSession = async ({ sessionId, sessionToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'Session not found!');
  }

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const sendResetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User is not found!');
  }
  const token = jwt.sign(
    {
      email,
    },
    env(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );
  try {
    await sendMail({
      html: `
      <h1>Hello!</h1>
      <p>
      Here is your reset link <a href="${env(
        ENV_VARS.FRONTEND_HOST,
      )}/reset-password?token=${token}">Link</a>
      </p>`,
      to: email,
      from: env(ENV_VARS.SMTP_USER),
      subject: 'Reset your password!',
    });
  } catch (err) {
    console.log(err);

    throw createHttpError(500, 'Problem with sending emails');
  }
};
