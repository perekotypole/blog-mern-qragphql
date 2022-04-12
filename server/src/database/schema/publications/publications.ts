import { Schema } from 'mongoose'

const Content = new Schema({
  template: {
    type: String,
    required: 'Template is required',
    enum: ['paragraph', 'list', 'tabel', 'image', 'subtitle'],
  },
  params: {
    type: Map,
    of: String,
  },
  data: {
    type: Schema.Types.Mixed,
    required: 'Content data is required',
  },
})

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
    type: [Content],
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
    required: true,
    ref: 'Topic',
  },
})
