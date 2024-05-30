import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeContact(id);
    if (deleted) {
      res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    await createContactSchema.validateAsync(req.body);
  
    const {id,name, email, phone } = req.body;
  
    if (!id || !name || !email || !phone) {
      throw new HttpError(400, "Name, email, and phone are required");
    }
  
    const result = await addContact( id,name, email, phone);
  
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  try {
    const { error: validationError } = updateContactSchema.validate(req.body);
    
    if (validationError) {
      throw new HttpError(400, validationError.message);
    }
    
    if (Object.keys(req.body).length < 1) {
      throw new HttpError(400, "Body must have at least one field");
    }
    const result = await updateById(id, req.body);
    if (!result) {
      throw new HttpError(404, "Not Found");
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
