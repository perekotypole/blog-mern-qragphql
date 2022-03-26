import { Schema } from 'mongoose'

export const topicSchema = new Schema({
  title: {
    type: String,
    required: 'Topic title is required',
    unique: 'Topic exists',
    trim: true,
    lowercase: true,
  },
})
