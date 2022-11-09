import { Document } from 'mongoose'

type UserEmail = string
type UserPassword = string
type UserFirstName = string
type UserLastName = string

interface User {
  name: {
    first: UserFirstName
    last: UserLastName
  },
  email: UserEmail
  password: UserPassword
  role: string
}

interface UserDocument extends User, Document {
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>
}

export { User, UserDocument, UserEmail, UserPassword }
