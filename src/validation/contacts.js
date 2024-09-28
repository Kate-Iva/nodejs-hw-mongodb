import Joi from "joi";

import { typeList, phoneRegex } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(phoneRegex).required(),
    email: Joi.string().email().min(3).max(30).required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required(),
});

export const contactPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().pattern(phoneRegex),
    email: Joi.string().email().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
});