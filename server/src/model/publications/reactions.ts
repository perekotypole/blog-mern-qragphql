import { Reactions } from '../resources'

export type publicationReactionModel = {
  id: string;
  userID: string;
  publicationID: boolean;
  reaction: Reactions;
}
