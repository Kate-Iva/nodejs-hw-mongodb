import Joi from "joi";

import { typeList, phoneNumberRegexp } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().valid(phoneNumberRegexp).required(),
    email: Joi.string().min(3).required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required(),
});

export const contactPatchSchema = Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    isFavourite: Joi.boolean().valid(...typeList),
    contactType: Joi.string(),
});