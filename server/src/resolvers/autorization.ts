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
        (err: any, res: userModel) => {
          if (err) reject(err)
          if (!res) reject()

          const token = generateToken(res.id, res.password)
          resolve({ token })
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
    role: (root: any, { data }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) resolve('guest')
      
      User.findById(userID,
        (err: any, res: userModel) => {
          if (err || !res) resolve('guest')
          
          resolve(res?.role || 'guest')
        },
      )
    }).catch(err => console.error(`Error: ${err}`)),
  },
  Mutation: {
    registerUser: (root: any, { user }) => new Promise((resolve, reject) => {
      const { ...rest } = user
      const newUser = new User({ ...rest, password: rest.password && Md5.hashStr(rest.password), role: 'user' })

      newUser.save((err: any, res: userModel) => {
        if (err) reject(err)
        if (!res) reject()
        
        const token = generateToken(newUser._id, Md5.hashStr(newUser.password))
        resolve({ token })
      })
    }).catch(err => console.error(`Error: ${err}`)),
  },
}
export default resolvers
