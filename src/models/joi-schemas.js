import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const InfoSpec = Joi.object()
.keys({
  address: Joi.string().required(),
  county: Joi.string().required(),
  vinylRarity: Joi.string().allow("").optional(),
  shopid: IdSpec,
})
.label("Info");

export const InfoSpecPlus = InfoSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  }).label("InfoPlus");

  export const InfoArraySpec = Joi.array().items(InfoSpecPlus).label("InfoArray");
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

export const ShopSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Golden Discs"),
    userid: IdSpec,
    info: InfoArraySpec,
  })
  .label("Shop");

export const ShopSpecPlus = ShopSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ShopPlus");

export const ShopArraySpec = Joi.array().items(ShopSpecPlus).label("ShopArray");




