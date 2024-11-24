import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().optional(),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
});

export const patchBookSchema = bookSchema.min(1);

export const deleteBookSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

export const getBookByIdSchema = Joi.object({
  bookId: Joi.string().length(24).required(), 
});

export const getAllBooksSchema = Joi.object({
  limit: Joi.number().integer().min(1).optional(),
  page: Joi.number().integer().min(1).optional(),
});

export const createBookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  author: Joi.string().min(1).max(255).required(),
  genre: Joi.string().min(1).max(100).optional(),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
  description: Joi.string().max(1000).optional(),
});