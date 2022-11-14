import { Document } from 'mongoose'
import { UserDocument } from './user.type'

interface Result {
    course: string
    score: number
    grade: string
    status: string
    student: UserDocument['_id']
}

interface ResultDocument extends Result, Document {
}

export { Result, ResultDocument }