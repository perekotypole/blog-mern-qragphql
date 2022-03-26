import { Templates } from '../resources'

type Content = {
  template: Templates,
  params: object,
  data: string | string[] | string[][] | object
}

export type publicationModel = {
  id: string,
  title: string,
  userID: string,
  content: Content[],
  createdAt: Date,
  views: number,
  topicID: string,
}
