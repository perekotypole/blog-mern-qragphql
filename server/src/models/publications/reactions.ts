import { Reactions } from '../enums'

export type publicationReactionModel = {
  id: string;
  user: string;
  publication: boolean;
  reaction: Reactions;
}
