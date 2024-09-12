import Joi from "joi";

import { typeList, phoneNumberRegexp } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.number().valid(phoneNumberRegexp).required(),
    email: Joi.string().min(3).required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required(),
});

export const contactPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.number().valid(phoneNumberRegexp),
    email: Joi.string().min(3),
    isFavourite: Joi.boolean().valid(...typeList),
    contactType: Joi.string().valid(...typeList),
});