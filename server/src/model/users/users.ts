import { Roles } from '../resources'

export type userModel = {
  id: string
  username: string,
  role: Roles,
  email: string,
  password: string,
  image: Buffer,
  bio: string,
  paymant: string,
  contact: string,
}
