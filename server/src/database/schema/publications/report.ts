import { Schema } from 'mongoose'

export const publicationReportSchema = new Schema({
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
})
