import { Reactions } from '../enums'

export type publicationReactionModel = {
  id: string;
  userID: string;
  publicationID: boolean;
  reaction: Reactions;
}
