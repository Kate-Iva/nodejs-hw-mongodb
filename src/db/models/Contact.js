import { Schema, model } from 'mongoose';

import { typeList, phoneRegex } from "../../constants/contacts.js";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must be exist"],
    },
    phoneNumber: {
      type: String,
      match: phoneRegex,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
  }
  },
  { timestamps: true },
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateOptions);

contactSchema.post("findOneAndUpdate", handleSaveError);

const ContactCollection = model('contact', contactSchema);

export const sortFields = ["name", "phoneNumber", "email", "isFavourite", "contactType", "createdAt", "updatedAt"];

export default ContactCollection;