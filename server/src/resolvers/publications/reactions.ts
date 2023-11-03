import { Types } from 'mongoose'

import { PublicationReaction, CommentReaction } from '../../database'
import { publicationReactionModel, commentReactionsModel } from '../../models'

const resolvers = {
  Query: {
    reactions: (root: any, { postID }, { userID }) => new Promise((resolve, reject) => {
      try {
        PublicationReaction.aggregate([
          { $match: { publication: Types.ObjectId(postID) }},
          { $group : { 
            _id: '$reaction',
            label : { $first: '$reaction' },
            number: { $sum: 1 },
          }},
        ]).exec((err, res) => {
          if (err) return reject()

          try {
            return PublicationReaction.findOne({ user: userID, publication: postID }, (_err, _res) => {
              if (_err) return reject()
              if (!_res) return resolve(res)

              try {
                return resolve(res.map(({ label, number }) => ({
                  label,
                  number,
                  selected: label === _res.reaction
                })))
              } catch (error) {
                reject(error)
              }
    
            })
          } catch (error) {
            reject(error)
          }
          
        })
      } catch (error) {
        reject(error)
      }
    }),

    commentReactions: (root: any, { commentID }, { userID }) => new Promise((resolve, reject) => {
      try {
        CommentReaction.aggregate([
          { $match: { comment: Types.ObjectId(commentID) }},
          { $group : { 
            _id: '$reaction',
            label : { $first: '$reaction' },
            number: { $sum: 1 },
          }},
        ]).exec((err, res) => {
          if (err) return reject()

          try {
            return CommentReaction.findOne({ user: userID, comment: commentID }, (_err, _res) => {
              if (_err) return reject()
              if (!_res) return resolve(res)

              try {
                return resolve(res.map(({ label, number }) => ({
                  label,
                  number,
                  selected: label === _res.reaction
                })))
              } catch (error) {
                reject(error)
              }
    
            })
          } catch (error) {
            reject(error)
          }
          
        })
      } catch (error) {
        reject(error)
      }
    }),
  },

  Mutation: {
    setReaction: (root: any, { postID, reaction }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      try {
        PublicationReaction.deleteMany({ user: userID, publication: postID })
        .exec((err, res) => {
          if (err) return reject()

          try {
            const newReaction = new PublicationReaction({ user: userID, publication: postID, reaction })
            newReaction.save((err: any, res) => {
              try {
                return resolve(true)
              } catch (error) {
                reject(error)
              }
            })
          } catch (error) {
            reject(error)
          }
  
        })
      } catch (error) {
        reject(error)
      }

    }),

    setCommentReaction: (root: any, { commentID, reaction }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      try {
        CommentReaction.deleteMany({ user: userID, comment: commentID })
        .exec((err, res) => {
          if (err) return reject()

          try {  
            const newReaction = new CommentReaction({ user: userID, comment: commentID, reaction })
            newReaction.save((err: any, res) => {
              try {
                return resolve(true)
              } catch (error) {
                reject(error)
              }
            })
          } catch (error) {
            reject(error)
          }
        })
      } catch (error) {
        reject(error)
      }

    }),
  }
}
export default resolvers
