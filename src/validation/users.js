import Joi from "joi";

import { emailRegexp } from "../constants/users.js";

export const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

//6.1
export const requestResetEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
  });
  
  export const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
    token: Joi.string().required(),
  });
  //