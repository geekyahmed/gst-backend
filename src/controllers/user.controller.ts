import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

import { UserService } from '../services'

import { UserDocument } from '../types/user.type'
import { Payload } from '../types/token.type'

import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { getJwtPayload } from '../utils/getJwtPayload'

import { sendResponse } from '../configs'

import { StatusCodes } from '../constants'

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getUsers()

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Users retrieved successfully', users)
  } catch (err) {
    next(err)
  }
}

async function getUserInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const user: UserDocument = await UserService.getUserInfo(Types.ObjectId(req.params.id))

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'User info retreived successfully', user)
  } catch (err) {
    next(err)
  }
}

async function getLoggedInUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { sub }: Payload = getJwtPayload(getTokenFromHeader(req))

    const user: UserDocument = await UserService.getLoggedInUserProfile(Types.ObjectId(req.params.id), sub)

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'User profile retreived successfully', user)
  } catch (err) {
    next(err)
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { sub }: Payload = getJwtPayload(getTokenFromHeader(req))

    const user: UserDocument = await UserService.updateUser(
      Types.ObjectId(req.params.id),
      req.body,
      sub
    )

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'User updated successfully', user)
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { sub }: Payload = getJwtPayload(getTokenFromHeader(req))

    await UserService.deleteUser(Types.ObjectId(req.params.id), sub)

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'User deleted successfully', {})
  } catch (err) {
    next(err)
  }
}

export { getUsers, getUserInfo, getLoggedInUserProfile, updateUser, deleteUser }
