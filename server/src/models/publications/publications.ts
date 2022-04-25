import { Templates } from '../enums'

export type publicationModel = {
  id: string,
  title: string,
  user: string,
  content: string,
  createdAt: Date,
  views: number,
  topic: string,
}
