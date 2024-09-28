import {Router} from "express";

import  * as contactControllers from "../controllers/contacts.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";

import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/uploads.js";

import validateBody from "../utils/validateBody.js";

import { contactAddSchema, contactPatchSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactControllers.getAllContactsController));
  
contactsRouter.get('/:id', isValidId, ctrlWrapper(contactControllers.getContactByIdController));

// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 2}])
// upload.array("poster", 8)

contactsRouter.post("/", upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactControllers.addContactController));

contactsRouter.put("/:id", isValidId, upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch("/:id", isValidId, upload.single('photo'), validateBody(contactPatchSchema),ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactControllers.deleteContactController));

  export default contactsRouter;