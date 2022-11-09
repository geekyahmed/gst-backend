import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import {
  isAuthenticated,
  validateRequest
} from '../../middlewares'

import { AuthController } from '../../controllers'
import { registrationSchema, loginSchema } from '../../schema/auth.schema';

const router: Router = express.Router()

router.post(
  '/register',
  validateRequest(registrationSchema),
  asyncHandler(AuthController.register),
)

router.get(
  '/validate',
  asyncHandler(AuthController.checkRegisterationData),
)

router.post(
  '/login',
  validateRequest(loginSchema),
  asyncHandler(AuthController.login),
)

router.get('/logout', isAuthenticated, asyncHandler(AuthController.logout))

export { router as AuthRoutes }
