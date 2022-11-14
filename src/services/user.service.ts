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

async function getLoggedInUserProfile(id: UserDocument['_id']): Promise<UserDocument> {
  const user: UserDocument = await User.findById(id).select('-password').lean()

  if (!user) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'User does not exist')
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

async function updateUser(id: UserDocument['_id'], body: IUser): Promise<UserDocument> {
  const userResponse = await User.findById(id)

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

  await User.findByIdAndDelete(id)
}

export { getUsers, getUserInfo, getLoggedInUserProfile, createUser, updateUser, deleteUser }
