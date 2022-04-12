import { Schema } from 'mongoose'

export const publicationBanSchema = new Schema({
  publication: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  active: {
    type: Boolean,
    default: () => true,
  },
  reason: {
    type: String,
    trim: true,
  },
})
