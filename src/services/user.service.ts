import createHttpError from 'http-errors'

import { User } from '../models'

import { UserDocument, User as IUser } from '../types/user.type'

import { StatusCodes } from '../constants'


async function getUsers() {
  const users = await User.find()

  return users
}

async function getUserInfo(id: UserDocument['_id']): Promise<UserDocument> {
  const user: UserDocument = await User.findById(id).select('-password').lean()

  if (!user) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'User does not exist')
  }

  return user
}

async function getLoggedInUserProfile(id: UserDocument['_id'], loggedInUserId: string): Promise<UserDocument> {
  const user: UserDocument = await User.findById(id).select('-password').lean()

  if (!user) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'User does not exist')
  }

  if (String(user._id) !== String(loggedInUserId)) {
    throw createHttpError(StatusCodes.HTTP_STATUS_UNAUTHORIZED, 'Cannot access this endpoint')
  }

  return user
}

async function createUser(body: IUser): Promise<UserDocument> {
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, 'Email already exists')
  }

  const user: UserDocument = await User.create(body)

  return user
}

async function updateUser(id: UserDocument['_id'], body: IUser, loggedInUserId: string): Promise<UserDocument> {
  const userResponse = await User.findById(id)

  if (String(loggedInUserId) !== String(userResponse.id)) {
    throw createHttpError(StatusCodes.HTTP_STATUS_UNAUTHORIZED, 'Cannot access this endpoint')
  }

  const user: UserDocument = await User.findByIdAndUpdate(id, body, {
    new: true,
  }).select('-password')

  if (!user) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'User does not exist')
  }

  return user
}

async function deleteUser(id: UserDocument['_id'], loggedInUserId: string): Promise<void> {
  const userResponse = await User.findById(id)

  if (String(loggedInUserId) !== String(userResponse.id)) {
    throw createHttpError(StatusCodes.HTTP_STATUS_UNAUTHORIZED, 'Cannot access this endpoint')
  }

  await User.findByIdAndDelete(id)
}

export { getUsers, getUserInfo, getLoggedInUserProfile, createUser, updateUser, deleteUser }
