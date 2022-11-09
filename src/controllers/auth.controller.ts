import { Request, Response, NextFunction } from 'express'

import { AuthService } from '../services'

import { sendResponse } from '../configs'

import { StatusCodes } from '../constants'

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const registerResponse = await AuthService.register(req.body)

    sendResponse(res, StatusCodes.HTTP_STATUS_CREATED, 'Account created successfully', registerResponse)
  } catch (err) {
    next(err)
  }
}

async function checkRegisterationData(req: Request, res: Response, next: NextFunction) {
  try {
    await AuthService.checkRegisterationData(req.body.email)

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, `${req.body.email} is available ✔`)
  } catch (err) {
    next(err)
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const loginResponse = await AuthService.login(req.body)

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Login successful', loginResponse)
  } catch (err) {
    next(err)
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await AuthService.logout(req.headers.authorization)

    sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Logout successful')
  } catch (err) {
    next(err)
  }
}

export { register, checkRegisterationData, login, logout }
