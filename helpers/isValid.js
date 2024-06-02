import { isValidObjectId } from "mongoose";

const isValidId = (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: `${id} is not valid id!` });
  }
};

export default isValidId;
