import { Types } from 'mongoose'

import { PublicationReaction, CommentReaction } from '../../database'
import { publicationReactionModel, commentReactionsModel } from '../../models'

const resolvers = {
  Query: {
    reactions: (root: any, { postID }, { userID }) => new Promise((resolve, reject) => {
      PublicationReaction.aggregate([
        { $match: { publication: Types.ObjectId(postID) }},
        { $group : { 
          _id: '$reaction',
          label : { $first: '$reaction' },
          number: { $sum: 1 },
        }},
      ]).exec((err, res) => {
        if (err) return reject()
        
        return PublicationReaction.findOne({ user: userID, publication: postID }, (_err, _res) => {
          if (_err) return reject()
          if (!_res) return resolve(res)

          return resolve(res.map(({ label, number }) => ({
            label,
            number,
            selected: label === _res.reaction
          })))
        })
      })
    }).catch(err => console.error(`Error: ${err}`)),
    commentReactions: (root: any, { commentID }, { userID }) => new Promise((resolve, reject) => {
      CommentReaction.aggregate([
        { $match: { comment: Types.ObjectId(commentID) }},
        { $group : { 
          _id: '$reaction',
          label : { $first: '$reaction' },
          number: { $sum: 1 },
        }},
      ]).exec((err, res) => {
        if (err) return reject()
        
        return CommentReaction.findOne({ user: userID, comment: commentID }, (_err, _res) => {
          if (_err) return reject()
          if (!_res) return resolve(res)

          return resolve(res.map(({ label, number }) => ({
            label,
            number,
            selected: label === _res.reaction
          })))
        })
      })
    }).catch(err => console.error(`Error: ${err}`)),
  },
  Mutation: {
    setReaction: (root: any, { postID, reaction }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      PublicationReaction.deleteMany({ user: userID, publication: postID })
      .exec((err, res) => {
        if (err) return reject()

        const newReaction = new PublicationReaction({ user: userID, publication: postID, reaction })
        newReaction.save((err: any, res) => {
          return resolve(true)
        })
      })
    }).catch(err => console.error(`Error: ${err}`)),
    setCommentReaction: (root: any, { commentID, reaction }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      CommentReaction.deleteMany({ user: userID, comment: commentID })
      .exec((err, res) => {
        if (err) return reject()

        const newReaction = new CommentReaction({ user: userID, comment: commentID, reaction })
        newReaction.save((err: any, res) => {
          return resolve(true)
        })
      })
    }).catch(err => console.error(`Error: ${err}`)),
  }
}
export default resolvers
