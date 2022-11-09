import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

import { TimetableService } from '../services'

import { TimetableDocument } from '../types/timetable.type'
import { Payload } from '../types/token.type'

import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { getJwtPayload } from '../utils/getJwtPayload'

import { sendResponse } from '../configs'

import { StatusCodes } from '../constants'

async function getTimetables(req: Request, res: Response, next: NextFunction) {
    try {
        const timetables = await TimetableService.getTimetables()

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Timetables retrieved successfully', timetables)
    } catch (err) {
        next(err)
    }
}

async function getTimetableInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const timetable: TimetableDocument = await TimetableService.getTimetableInfo(Types.ObjectId(req.params.id))

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Timetable info retreived successfully', timetable)
    } catch (err) {
        next(err)
    }
}

async function updateTimetable(req: Request, res: Response, next: NextFunction) {
    try {
        const timetable: TimetableDocument = await TimetableService.updateTimetable(
            Types.ObjectId(req.params.id),
            req.body
        )

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Timetable updated successfully', timetable)
    } catch (err) {
        next(err)
    }
}

async function deleteTimetable(req: Request, res: Response, next: NextFunction) {
    try {
        await TimetableService.deleteTimetable(Types.ObjectId(req.params.id))

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Timetable deleted successfully', {})
    } catch (err) {
        next(err)
    }
}

export { getTimetables, getTimetableInfo, updateTimetable, deleteTimetable }
