import { gql } from 'apollo-server-express'

const typeDefs = gql`
  enum Reactions {
    laugh,
    heart,
    cry,
    fire,
    like,
    unamused,
    broken,
    dislike,
    shock,
  }

  type Reaction {
    _id: ID,
    label: Reactions,
    number: Int,
    selected: Boolean
  }

  extend type Query {
    reactions(postID: String): [Reaction],
    commentReactions(commentID: String): [Reaction],
  }

  extend type Mutation {
    setReaction(postID: String, reaction: Reactions): Boolean,
    setCommentReaction(commentID: String, reaction: Reactions): Boolean,
  }
`
export default typeDefs
