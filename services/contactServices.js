import { Contact } from "../models/contactModel.js";

export async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error("Unable to list contacts");
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact || null;
  } catch (error) {
    throw new Error("Unable to get contact by ID");
  }
}

export async function removeContact(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    throw Error("Unable to remove contact");
  }
}

export async function addContact(data) {
  try {
    const newContact = await Contact.create(data);
    return newContact;
  } catch (error) {
    throw new Error("Unable to add contact");
  }
}

export async function updateById(contactId, data) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    throw new Error("Unable to update contact by ID");
  }
}

export async function updateStatusContact(contactId, body) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    throw new Error("Unable to update contact status");
  }
}