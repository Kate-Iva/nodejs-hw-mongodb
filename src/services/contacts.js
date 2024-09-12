import ContactCollection from '../db/models/Contact.js';

import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from "../constants/index.js";

export const getContacts = async ({
    perPage,
    page, 
    sortBy = "_id", 
    sortOrder = SORT_ORDER[0],
    filter = {},
}) => {
    const skip = (page - 1) * perPage;

    // Створюємо базовий запит
    const contactQuery = ContactCollection.find();

    // Застосування фільтрів
    if (filter.contactType) {
        contactQuery.where('contactType').equals(filter.contactType);
    }

    // Підрахунок документів з фільтром
    const count = await ContactCollection.countDocuments(contactQuery.getQuery());

    // Додаємо пагінацію та сортування
    const contacts = await contactQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });

    const paginationData = calculatePaginationData({ count, perPage, page });

    return {

        contacts,
        page,
        perPage,
        totalItems: count,
        ...paginationData,
    };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async(filter, data, options = {})=> {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        includeResultMetadata: true,
        ...options,
    });

    if(!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);