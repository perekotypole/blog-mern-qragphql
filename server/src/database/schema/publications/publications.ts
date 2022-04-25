import { Schema } from 'mongoose'

export const publicationSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
    trim: true,
    minLength: [3, 'Title must have at least 3 characters'],
    maxLength: [256, 'Title is too large. The maximum number of characters is 256'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  views: {
    type: Number,
    default: () => 0,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  },
})
publicationSchema.index({ title: 'text', content: 'text' }, { weights: { title: 2, content: 1 } });
