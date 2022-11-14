import { omit, pickBy, identity } from 'lodash'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { fromUnixTime } from 'date-fns'

import { config } from '../configs'

import { User } from '../models'

import { createToken, invalidateToken } from './token.service'

import { Payload, BearerToken, TokenResponse } from '../types/token.type'
import { User as IUser, UserDocument } from '../types/user.type'
import { Login as ILogin } from '../types/login.type'

import { StatusCodes } from '../constants'


async function register(user: IUser): Promise<UserDocument> {
  if (await User.doesEmailExist(user.email)) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Email already exist')
  }

  const createdUser = await User.create(user)

  return createdUser
}


async function checkRegisterationData(email: string) {
  if (await User.doesEmailExist(email)) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Email already used by another account')
  }
}

async function login({ email, password }: ILogin): Promise<Object> {
  const credentials: object = pickBy(omit({ email }, 'password'), identity)

  if (!await User.doesEmailExist(email)) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Email does not exist')
  }

  const user: UserDocument = await User.findOne({ ...credentials })

  if (!user || !(await user.doesPasswordMatch(password))) {
    throw createHttpError(401, 'Login info incorrect')
  }

  const token: TokenResponse = await createToken(user)

  return {
    user: omit(user.toJSON(), 'password'),
    token
  }
}

async function logout(token: BearerToken) {
  const extractedToken = token.split(' ')[1]

  const payload = jwt.verify(extractedToken, config.jwt.secret) as Payload

  if (!payload) {
    throw createHttpError(StatusCodes.HTTP_STATUS_UNAUTHORIZED, 'Token invalid')
  }

  await invalidateToken(payload.sub, extractedToken, fromUnixTime(payload.exp))
}

export {
  register,
  checkRegisterationData,
  login,
  logout
}
