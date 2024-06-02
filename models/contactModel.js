import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.post("save", function(error, doc, next) {
  if (error.name === 'ValidationError') {
    error.status = 400;
  }
  next(error);
});

export const Contact = model("contact", contactSchema);