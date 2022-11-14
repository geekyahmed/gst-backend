import { Document } from 'mongoose'

type UserEmail = string
type UserPassword = string

interface User {
  name: string
  email: UserEmail
  password: UserPassword
  role: string
}

interface UserDocument extends User, Document {
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>
}

export { User, UserDocument, UserEmail, UserPassword }
