import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const ShopSpec = {
  title: Joi.string().required(),
};

export const InfoSpec = {
  address: Joi.string().required(),
  county: Joi.string().required(),
  vinylRarity: Joi.number().allow("").optional(),
};


