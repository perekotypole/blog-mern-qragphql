import { Comment } from '../../database'
import { commentModel } from '../../models'

const resolvers = {
  Query: {
    comments: (root: any, { publicationID }) => new Promise((resolve, reject) => {
      Comment.find(
        { publication: publicationID },
        null,
        { sort: { 'createdAt' : -1 } },
      ).populate (['user']).exec((err: any, res: any) => {
        if (err) return reject(err)
        resolve(res)
      })
    }).catch(err => console.error(`Error: ${err}`)),
  },
  Mutation: {
    writeComment: (root: any, { comment, publicationID }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()
      
      const newComment = new Comment({ content: comment, user: userID, publication: publicationID })
      
      newComment.save((err: any, res: commentModel) => {
        if (err) return reject(err)

        Comment.findById(newComment._id)
          .populate(['user'])
          .exec((_, _res) => {
            resolve(_res)
          });
      })
    }).catch(err => console.error(`Error: ${err}`)),
  }
}
export default resolvers
