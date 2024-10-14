import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!id) {
      throw new Error('id in params is required');
    }

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Event not found'));
    }
    return next();
  };
