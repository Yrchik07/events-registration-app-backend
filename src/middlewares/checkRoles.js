import createHttpError from 'http-errors';
import { Events } from '../db/models/events.js';

export const checkChildPermissions =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { eventId } = req.params;

    if (roles.includes('teacher') && user.role === 'teacher') {
      return next();
    }

    if (roles.includes('parent') && user.role === 'parent') {
      const event = await Events.findOne({
        _id: eventId,
        parentId: user._id,
      });

      if (!event) {
        return next(createHttpError(403, 'This is not you child'));
      }
      return next();
    }

    return next(createHttpError(403, 'Forbidden'));
  };
