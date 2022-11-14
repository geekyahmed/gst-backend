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


router.
  route('/')
  .get(asyncHandler(UserController.getUsers))
  .post(asyncHandler(UserController.createUser))

router.
  route('/:id')
  .get(asyncHandler(UserController.getUserInfo))
  .put(asyncHandler(UserController.updateUser))
  .delete(asyncHandler(UserController.deleteUser))

export { router as UserRoutes }
