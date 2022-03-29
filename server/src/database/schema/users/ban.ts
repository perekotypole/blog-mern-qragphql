import { Schema } from 'mongoose'

export const userBanSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  period: {
    type: {
      start: {
        type: Date,
        default: () => new Date(),
      },
      finish: {
        type: Date,
        required: 'End of the ban period is required',
      },
    },
    required: 'The ban period is required',
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
