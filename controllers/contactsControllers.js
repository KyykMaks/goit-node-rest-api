import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
  updateStatusContact,
} from "../services/contactServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Please fill in all required fields with valid values" });
  }
};


export const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = req.body;

  try {
    const result = await updateById(id, contact);
    if (!result) {
      throw HttpError(404, "Not Found");
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({  message: "Please provide valid values for all fields" });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await updateStatusContact(id, { favorite });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Invalid value for the favorite field"});
  }
};