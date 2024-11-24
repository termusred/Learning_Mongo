import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const patchUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  role: Joi.string().valid("user", "admin").optional(),
}).min(1);

export const deleteUserSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

export const getUserByIdSchema = Joi.object({
  userId: Joi.string().length(24).required()
});

export const getAllUsersSchema = Joi.object({
  limit: Joi.number().integer().min(1).optional(),
  page: Joi.number().integer().min(1).optional(),
});

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(
    req.body || req.params || req.query,
    { abortEarly: false, allowUnknown: true }
  );

  if (error) {
    return res.status(400).send({ errors: error.details.map((err) => err.message) });
  }

  next();
};
