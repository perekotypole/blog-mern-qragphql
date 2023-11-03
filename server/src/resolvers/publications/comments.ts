import { Comment } from '../../database'
import { commentModel } from '../../models'

const resolvers = {
  Query: {
    comments: (root: any, { publicationID }) => new Promise((resolve, reject) => {
      try {
        Comment.find(
          { publication: publicationID },
          null,
          { sort: { 'createdAt' : -1 } },
        ).populate (['user']).exec((err: any, res: any) => {
          try {
            if (err) return reject(err)
            return resolve(res)
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
    writeComment: (root: any, { comment, publicationID }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()
      try {
        if (!comment || !comment.trim()) reject('Empty comment')
        const newComment = new Comment({ content: comment.trim(), user: userID, publication: publicationID })
        
        newComment.save((err: any, res: commentModel) => {
          if (err) return reject(err)
          try {
            Comment.findById(newComment._id)
              .populate(['user'])
              .exec((_, _res) => {
                try {
                  return resolve(_res)
                } catch (error) {
                  reject(error)
                }
              });
          } catch (error) {
            throw new Error();
          }
        })
      } catch (error) {
        reject(error)
      }
      
    }),
  }
}
export default resolvers
