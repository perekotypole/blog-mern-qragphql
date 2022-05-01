import { Schema } from 'mongoose'

export const commentReactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  comment: {
    type: Schema.Types.ObjectId,
    required: 'Comment is required',
    ref: 'Comment',
  },
  reaction: {
    type: String,
    enum: {
      values: [
        'laugh',
        'heart',
        'cry',
        'fire',
        'like',
        'unamused',
        'broken',
        'dislike',
        'shock',
      ],
      message: '{VALUE} is not supported',
    },
    required: 'Reaction is required',
  },
})
