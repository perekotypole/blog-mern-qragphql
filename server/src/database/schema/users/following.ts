import { Schema } from 'mongoose'

export const followingSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  followedUserID: {
    type: Schema.Types.ObjectId,
    required: 'Followed user is required',
    ref: 'User',
  },
})
