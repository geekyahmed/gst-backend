import { Document } from 'mongoose'
import { UserDocument } from './user.type'

interface Timetable {
    course: string
    venue: string
    lecturer: UserDocument['_id']
    type: string
    startTime: string
    endTime: string
}

interface TimetableDocument extends Timetable, Document {
}

export { Timetable, TimetableDocument }