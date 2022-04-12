import { Schema } from 'mongoose'

export const followingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  followedUser: {
    type: Schema.Types.ObjectId,
    required: 'Followed user is required',
    ref: 'User',
  },
})
