import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import {
    isAuthenticated,
} from '../../middlewares'

import { ResultController } from '../../controllers'

const router: Router = express.Router()

router.all('/*', isAuthenticated, (req, res, next) => {
    next()
})

router.get('/', asyncHandler(ResultController.getResults))

router.
    route('/:id')
    .get(asyncHandler(ResultController.getResultInfo))
    .put(asyncHandler(ResultController.updateResult))
    .delete(asyncHandler(ResultController.deleteResult))


export { router as ResultRoutes }
