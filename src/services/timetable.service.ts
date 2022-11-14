import createHttpError from 'http-errors'

import { Timetable } from '../models'

import { TimetableDocument, Timetable as ITimetable } from '../types/Timetable.type'

import { StatusCodes } from '../constants'

async function getTimetables() {
  const timetables = await Timetable.find()

  return timetables
}

async function getTimetableInfo(id: TimetableDocument['_id']): Promise<TimetableDocument> {
  const timetable: TimetableDocument = await Timetable.findById(id).select('-password').lean()

  if (!timetable) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Timetable does not exist')
  }

  return timetable
}

async function createTimetable(body: ITimetable): Promise<TimetableDocument> {
  const timetable: TimetableDocument = await Timetable.create(body)

  return timetable
}

async function updateTimetable(id: TimetableDocument['_id'], body: ITimetable): Promise<TimetableDocument> {
  const timetable: TimetableDocument = await Timetable.findByIdAndUpdate(id, body, {
    new: true,
  })

  if (!timetable) {
    throw createHttpError(StatusCodes.HTTP_STATUS_BAD_REQUEST, 'Timetable does not exist')
  }

  return timetable
}

async function deleteTimetable(id: TimetableDocument['_id']): Promise<void> {
  await Timetable.findByIdAndDelete(id)
}

export { getTimetables, getTimetableInfo, createTimetable, updateTimetable, deleteTimetable }
