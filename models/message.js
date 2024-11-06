import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
});

const Message = models.Message || model('Message', MessageSchema);

export default Message;
