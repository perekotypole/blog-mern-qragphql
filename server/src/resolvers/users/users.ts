import { User } from '../../database'
import { userModel } from '../../models'

const resolvers = {
  Query: {
    ownProfile: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) reject()

      User.findById(userID,
        (err: any, res: userModel) => {
          if (err) reject(err)
          else resolve(res)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
    username: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) reject()

      User.findById(userID,
        (err: any, res: userModel) => {
          if (err) reject(err)
          else resolve(res?.username)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
  },
}
export default resolvers
