import {Md5} from 'ts-md5/dist/md5'
import jwt from 'jsonwebtoken'

import { User } from '../database'
import { userModel } from '../models'
import { UserInputError } from 'apollo-server-express'

const generateToken = async (userID: string, userKey: string) => {
  const token: string = await jwt.sign(
    { userID },
    userKey,
  )

  return token
}

const resolvers = {
  Query: {
    login: (root: any, { data }) => new Promise((resolve, reject) => {      
      const { username, password } = data
      const hashpass = Md5.hashStr(password)
      
      User.findOne(
        { username, password: hashpass },
        (err: any, res) => {
          if (err) return reject(err)
          if (!res) return reject()

          const token = generateToken(res._id, res.password)
          return resolve({ token })
        },
      ).catch(err => { throw new Error(err) })
    }).catch(err => console.error(`Error: ${err}`)),
    role: (root: any, { data }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return resolve('guest')
      
      User.findById(userID,
        (err: any, res: userModel) => {
          if (err || !res) return resolve('guest')
          
          return resolve(res?.role || 'guest')
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
  },
  Mutation: {
    registerUser: (root: any, { user }) => new Promise((resolve, reject) => {
      const { ...rest } = user
      const newUser = new User({ ...rest, password: rest.password && Md5.hashStr(rest.password), role: 'user' })

      newUser.save((err: any, res: userModel) => {
        if (err) return reject(err)
        if (!res) return reject()
        
        const token = generateToken(newUser._id, Md5.hashStr(newUser.password))
        return resolve({ token })
      })
    }).catch(err => console.error(`Error: ${err}`)),
  },
}
export default resolvers
