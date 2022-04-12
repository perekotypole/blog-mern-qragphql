import { Schema } from 'mongoose'

export const userReportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  reportedUser: {
    type: Schema.Types.ObjectId,
    required: 'Reported user is required',
    ref: 'User',
  },
})
