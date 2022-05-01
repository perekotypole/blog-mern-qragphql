import { User, Publication } from '../../database'
import { userModel } from '../../models'

const resolvers = {
  Query: {
    ownProfile: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      User.findById(userID,
        (err: any, res: userModel) => {
          if (err) return reject(err)
          else return resolve(res)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
    profile: (root: any, { username }) => new Promise((resolve, reject) => {
      User.findOne({ username },
        (err: any, res: userModel) => {
          if (err) return reject(err)
          else return resolve(res)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
    profiles: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) reject()

      User.find({},
        (err: any, res: userModel) => {
          if (err) return reject(err)
          else return resolve(res)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
    username: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      User.findById(userID,
        (err: any, res: userModel) => {
          if (err)return  reject(err)
          else return resolve(res?.username)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
  },
  Mutation: {
    changeRole: (root: any, { user, role }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      User.findByIdAndUpdate (user,
        { role },
        (err: any, res: userModel) => {
          if (err) return reject(err)
          else return resolve(true)
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
    removeUser: (root: any, { id }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()
      
      User.findByIdAndDelete(id,
        (err, res) => {
          if (err) return reject(err)

          Publication.deleteMany({ user: id },
            (err, res) => {}
          )
          
          return resolve(true)
        }
      )
    }).catch(err => console.error(`Error: ${err}`)),
  }
}
export default resolvers
