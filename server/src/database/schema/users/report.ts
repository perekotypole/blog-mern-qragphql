import { Schema } from 'mongoose'

export const userReportSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  reportedUserID: {
    type: Schema.Types.ObjectId,
    required: 'Reported user is required',
    ref: 'User',
  },
})
