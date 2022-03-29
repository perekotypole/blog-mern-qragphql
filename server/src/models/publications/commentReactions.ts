import { Reactions } from '../enums'

export type commentReactionsModel = {
  id: string;
  userID: string;
  commentID: string;
  reaction: Reactions;
}
