import { User, Publication } from '../../database'
import { userModel } from '../../models'

const resolvers = {
  Query: {
    ownProfile: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      try {
        User.findById(userID,
          (err: any, res: userModel) => {
            try {
              if (err) return reject(err)
              else return resolve(res)
              
            } catch (error) {
              reject(error)
            }
          },
        )
              
      } catch (error) {
        reject(error)
      }
      if (!userID) return reject()

    }),

    profile: (root: any, { username }) => new Promise((resolve, reject) => {
      try {
        User.findOne({ username },
          (err: any, res: userModel) => {
            try {
              if (err) return reject(err)
              else return resolve(res)
              
            } catch (error) {
              reject(error)
            }
          },
        )
              
      } catch (error) {
        reject(error)
      }
    }),

    profiles: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      try {
        if (!userID) reject()
  
        User.find({},
          (err: any, res: userModel) => {
            try {
              if (err) return reject(err)
              else return resolve(res)
              
            } catch (error) {
              reject(error)
            }
          },
        )
              
      } catch (error) {
        reject(error)
      }
    }),

    username: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      try {
        if (!userID) return reject()
  
        User.findById(userID,
          (err: any, res: userModel) => {
            try {
              if (err)return  reject(err)
              else return resolve(res?.username)
              
            } catch (error) {
              reject(error)
            }
          },
        )
              
      } catch (error) {
        reject(error)
      }
    }),
  },

  Mutation: {
    changeRole: (root: any, { user, role }, { userID }) => new Promise((resolve, reject) => {
      try {
        if (!userID) return reject()
  
        User.findByIdAndUpdate (user,
          { role },
          (err: any, res: userModel) => {
            try {
              if (err) return reject(err)
              else return resolve(true)
              
            } catch (error) {
              reject(error)
            }
          },
        )
              
      } catch (error) {
        reject(error)
      }
    }),

    removeUser: (root: any, { id }, { userID }) => new Promise((resolve, reject) => {
      try {
        if (!userID) return reject()
        
        User.findByIdAndDelete(id,
          (err, res) => {
            try {
              if (err) return reject(err)
    
              Publication.deleteMany({ user: id },
                (err, res) => {}
              )
              
              return resolve(true)
              
            } catch (error) {
              reject(error)
            }
          }
        )
              
      } catch (error) {
        reject(error)
      }
    }),
  }
}
export default resolvers
