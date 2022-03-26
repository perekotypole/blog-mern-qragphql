import { Schema } from 'mongoose'

export const commentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  publicationID: {
    type: Schema.Types.ObjectId,
    required: 'Publication is required',
    ref: 'Publication',
  },
  content: {
    type: String,
    required: 'Comment is required',
  },
})
