import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).max(14).required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  ame: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(8),
  favorite: Joi.boolean()
});

export const updateStatusSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(8),
  favorite: Joi.boolean().required(),
});