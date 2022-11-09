import createHttpError from 'http-errors'

import { Result } from '../models'

import { ResultDocument, Result as IResult } from '../types/result.type'

import { StatusCodes } from '../constants'

async function getResults() {
  const results = await Result.find()

  return results
}

async function getResultInfo(id: ResultDocument['_id']): Promise<ResultDocument> {
  const result: ResultDocument = await Result.findById(id).select('-password').lean()

  if (!result) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Result does not exist')
  }

  return result
}

async function createResult(body: IResult): Promise<ResultDocument> {
  const result: ResultDocument = await Result.create(body)

  return result
}

async function updateResult(id: ResultDocument['_id'], body: IResult): Promise<ResultDocument> {
  const result: ResultDocument = await Result.findByIdAndUpdate(id, body, {
    new: true,
  })

  if (!result) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Result does not exist')
  }

  return result
}

async function deleteResult(id: ResultDocument['_id']): Promise<void> {
  await Result.findByIdAndDelete(id)
}

export { getResults, getResultInfo, createResult, updateResult, deleteResult }
