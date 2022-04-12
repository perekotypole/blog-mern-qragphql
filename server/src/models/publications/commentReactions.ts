import { Reactions } from '../enums'

export type commentReactionsModel = {
  id: string;
  user: string;
  comment: string;
  reaction: Reactions;
}
