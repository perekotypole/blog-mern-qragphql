import { Schema } from 'mongoose'

export const publicationReactionSchema = new Schema({
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
