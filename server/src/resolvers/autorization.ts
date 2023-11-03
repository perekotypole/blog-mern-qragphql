import {Md5} from 'ts-md5/dist/md5'
import jwt from 'jsonwebtoken'

import { User } from '../database'
import { userModel } from '../models'
import { UserInputError } from 'apollo-server-express'

const generateToken = (userID: string, userKey: string) => {
  try {
    const token: string = jwt.sign(
      { userID },
      userKey,
    )
    return token
  } catch (error) {
    console.log(error);
    return null
  }
}

const resolvers = {
  Query: {
    login: (root: any, { data }) => new Promise((resolve, reject) => {   
      
      try {
        const { username, password } = data
        if (!username || !password) return reject('Not all data entered')

        const hashpass = Md5.hashStr(password)
        
        User.findOne(
          { username, password: hashpass },
          (err: any, res) => {
            try {
              if (err) return reject(err)
              if (!res) return reject('Сheck the entered data')
    
              const token = generateToken(res._id, res.password)
              return resolve({ token })
            } catch (error) {
              reject(error)
            }
          },
        )
      } catch (error) {
        reject(error)
      }
    }),

    role: (root: any, { data }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return resolve('guest')

      try {
        User.findById(userID,
          (err: any, res: userModel) => {
            if (err || !res) return resolve('guest')

            try {
              return resolve(res?.role || 'guest')
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
    registerUser: (root: any, { user }) => new Promise((resolve, reject) => {
      try {
        User.create(
          { 
            username: user.username,
            email: user.email,
            password: user.password && Md5.hashStr(user.password),
            role: 'user'
          },
          (err: any, res) => {
            try {
              if (err) return reject(err)
              if (!res) return reject()
              
              const token = generateToken(res._id, res.password)
              
              return resolve({ token })
            } catch (error) {
              reject(error)
            }
          },
        )
      } catch (error) {
        reject(error)
      }
    })
  },
}
export default resolvers
