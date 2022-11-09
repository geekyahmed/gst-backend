import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import {
  isAuthenticated,
} from '../../middlewares'

import { UserController } from '../../controllers'

const router: Router = express.Router()

router.all('/*', isAuthenticated, (req, res, next) => {
  next()
})


router.get('/', asyncHandler(UserController.getUsers))

router.
  route('/:id')
  .get(asyncHandler(UserController.getUserInfo))
  .put(asyncHandler(UserController.updateUser))
  .delete(asyncHandler(UserController.deleteUser))

router.get('/:id/profile', isAuthenticated, asyncHandler(UserController.getLoggedInUserProfile))

export { router as UserRoutes }
