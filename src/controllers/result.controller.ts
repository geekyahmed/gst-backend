import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

import { ResultService } from '../services'

import { ResultDocument } from '../types/result.type'
import { Payload } from '../types/token.type'

import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { getJwtPayload } from '../utils/getJwtPayload'

import { sendResponse } from '../configs'

import { StatusCodes } from '../constants'

async function getResults(req: Request, res: Response, next: NextFunction) {
    try {
        const results = await ResultService.getResults()

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Results retrieved successfully', results)
    } catch (err) {
        next(err)
    }
}

async function getResultInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const result: ResultDocument = await ResultService.getResultInfo(Types.ObjectId(req.params.id))

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Result info retreived successfully', result)
    } catch (err) {
        next(err)
    }
}

async function createResult(req: Request, res: Response, next: NextFunction) {
  try {
    const result: ResultDocument = await ResultService.createResult(req.body)

    sendResponse(res, StatusCodes.HTTP_STATUS_CREATED, 'Result created successfully', result)
  } catch(err){
    next(err)
  }
}


async function updateResult(req: Request, res: Response, next: NextFunction) {
    try {
        const result: ResultDocument = await ResultService.updateResult(
            Types.ObjectId(req.params.id),
            req.body
        )

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Result updated successfully', result)
    } catch (err) {
        next(err)
    }
}

async function deleteResult(req: Request, res: Response, next: NextFunction) {
    try {
        await ResultService.deleteResult(Types.ObjectId(req.params.id))

        sendResponse(res, StatusCodes.HTTP_STATUS_OK, 'Result deleted successfully', {})
    } catch (err) {
        next(err)
    }
}

export { getResults, getResultInfo, createResult, updateResult, deleteResult }
