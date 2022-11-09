import { Schema, model, Model, SchemaTypes } from 'mongoose'
import bcrypt from 'bcryptjs'

import { UserEmail, UserPassword, UserDocument } from '../types/user.type'

interface IUser extends Model<UserDocument> {
  doesEmailExist: (email: UserEmail) => Promise<boolean>
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    name: {
      first: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        lowercase: true
      },
      last: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        lowercase: true
      }
    },
    email: {
      type: Schema.Types.String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    role: {
      type: Schema.Types.String,
      default: 'student',
      enum: ['student', 'lecturer', 'admin']
    }
  },
  {
    timestamps: true,
  },
)

/* eslint-disable-next-line func-names */
UserSchema.statics.doesEmailExist = async function (
  email: UserEmail,
): Promise<boolean> {
  const user = await this.findOne({ email }).lean()
  
  return Boolean(user)
}


/* eslint-disable-next-line func-names */
UserSchema.methods.doesPasswordMatch = async function (
  password: UserPassword,
): Promise<boolean> {
  const user = this

  return bcrypt.compare(password, user.password)
}

/* eslint-disable-next-line func-names */
UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User: IUser = model<UserDocument, IUser>('User', UserSchema)

export { User }
