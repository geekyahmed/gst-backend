import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import {
    isAuthenticated,
} from '../../middlewares'

import { TimetableController } from '../../controllers'

const router: Router = express.Router()

router.all('/*', isAuthenticated, (req, res, next) => {
    next()
})

router.get(
    '/',
    isAuthenticated,
    asyncHandler(TimetableController.getTimetables),
)

router.
    route('/:id')
    .get(asyncHandler(TimetableController.getTimetableInfo))
    .put(asyncHandler(TimetableController.updateTimetable))
    .delete(asyncHandler(TimetableController.deleteTimetable))


export { router as TimetableRoutes }
