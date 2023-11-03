import { Schema } from 'mongoose'

export const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  publication: {
    type: Schema.Types.ObjectId,
    required: 'Publication is required',
    ref: 'Publication',
  },
  content: {
    type: String,
    required: 'Comment is required',
    minLength: [8, 'Comment must have at least 8 characters'],
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
})
