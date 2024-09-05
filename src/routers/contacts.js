import {Router} from "express";

import { getAllContactsController, getContactByIdController } from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/', getAllContactsController);
  
contactsRouter.get('/:id', getContactByIdController);

  export default contactsRouter;