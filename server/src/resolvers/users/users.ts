import { User } from '../../database'
import { userModel } from '../../models'

const resolvers = {
  Query: {
    findUser: (root: any, { id }) => {
      return new Promise((resolve, reject) => {
        User.findOne(
          { _id: id },
          (err: any, user: userModel) => {
            if (err) reject(err)
            else resolve(user)
          },
        )
      })
    },
  },
  Mutation: {
    createUser: (root: any, { user }) => {
      const { ...rest } = user
      const newUser = new User({ ...rest })

      return new Promise((resolve, reject) => {
        newUser.save((err: any, user: userModel) => {
          if (err) reject(err)
          else resolve(user)
        })
      })
    },
  },
}
export default resolvers
