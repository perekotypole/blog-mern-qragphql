import { Reactions } from '../resources'

export type commentReactionsModel = {
  id: string;
  userID: string;
  commentID: string;
  reaction: Reactions;
}
