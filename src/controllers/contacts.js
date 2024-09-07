import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';


export const getAllContactsController = async (req, res) => {
    const data = await contactServices.getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  };


  export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const data = await contactServices.getContactById(id);

    if (!data) {
      throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  };