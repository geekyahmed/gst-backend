import { Schema, model, SchemaTypes } from 'mongoose'

import { ResultDocument } from '../types/result.type'

const ResultSchema: Schema = new Schema(
    {
        course: {
            type: Schema.Types.String,
            required: true
        },
        score: {
            type: Schema.Types.Number,
            required: true
        },
        grade: {
            type: Schema.Types.String,
            required: true
        },
        status: {
            type: Schema.Types.String,
            enum: ['pass', 'fail', 'credit'],
            required: true
        },
        student: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    },
)

const Result = model<ResultDocument>('Result', ResultSchema)

export { Result }
