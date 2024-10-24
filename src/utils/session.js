import crypto from 'crypto';

export const createSession = () => {
    return {
      accessToken: crypto.randomBytes(20).toString('base64'),
      refreshToken: crypto.randomBytes(20).toString('base64'),
      accessTokenValidUntil: Date.now() + 1000 * 60 * 15,
      refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 7,
    //   refreshTokenValidUntil: Date.now() + 1000,
    };
  };


export const setupSessionCookies = (res, session) =>{
    res.cookie('sessionId', session.id, {
        httpOnly: true,
        expire: 7 * 24 * 60 * 60,
      });

      res.cookie('sessionToken', session.refreshToken, {
        httpOnly: true,
        expire: 7 * 24 * 60 * 60,
      });

};