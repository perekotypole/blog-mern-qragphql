import { Schema } from 'mongoose'

export const commentReactionSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: 'User is required',
    ref: 'User',
  },
  commentID: {
    type: Schema.Types.ObjectId,
    required: 'Comment is required',
    ref: 'Comment',
  },
  reaction: {
    type: String,
    enum: {
      values: [
        'U+1F602',
        'U+2764',
        'U+1F62D',
        'U+1F525',
        'U+1F44D',
        'U+1F612',
        'U+1F494',
        'U+1F44E',
        'U+1F631',
      ],
      message: '{VALUE} is not supported',
    },
    required: 'Reaction is required',
  },
})
