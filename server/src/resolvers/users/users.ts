import { User } from '../../database'
import { userModel } from '../../models'

const resolvers = {
  Query: {
    findUser: (root: any, { id }) => new Promise((resolve, reject) => {
      User.findOne(
        { _id: id },
        (err: any, res: userModel) => {
          if (err) reject(err)
          else resolve(res)
        },
      )
    }),
  },
  Mutation: {
    createUser: (root: any, { user }) => {
      const { ...rest } = user
      const newUser = new User({ ...rest })

      return new Promise((resolve, reject) => {
        newUser.save((err: any, res: userModel) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
    },
  },
}
export default resolvers
