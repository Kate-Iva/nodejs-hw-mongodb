import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/filters/parseContactFilterParams.js';

import { sortFields } from '../db/models/Contact.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const data = await contactServices.getContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};


  export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const data = await contactServices.getContactById(id);

    if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  };

  export const addContactController = async(req, res)=> {
    const data = await contactServices.createContact(req.body);
    
    res.status(201).json({
      status: 201,
      message: "Contact add successfully",
      data,
    });
  };

  export const upsertContactController = async(req, res)=> {
    const {id} = req.params;
    const {isNew, data} = await contactServices.updateContact({_id: id}, req.body, {upsert: true});
  
    const status = isNew ? 201 : 200;
  
    res.status(status).json({
      status,
      message: "Contact upsert successfully",
      data,
    });
  };

  export const patchContactController = async(req, res)=> {
    const {id} = req.params;
    const result = await contactServices.updateContact({_id: id}, req.body);
  
    if (!result) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }
  
    res.json({
      status: 200,
      message: "Contact patched successfully",
      data: result.data,
    });
  };

  export const deleteContactController = async(req, res)=> {
    const {id} = req.params;
    const data = await contactServices.deleteContact({_id: id});
  
    if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }
  
    res.status(204).send();
  };