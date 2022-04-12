import { Templates } from '../enums'

type Content = {
  template: Templates,
  data: string | string[] | string[][] | object
}

export type publicationModel = {
  id: string,
  title: string,
  user: string,
  content: Content[],
  createdAt: Date,
  views: number,
  topic: string,
}
