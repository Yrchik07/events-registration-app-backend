import Joi from "joi";

export const validationGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});