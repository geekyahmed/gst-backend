import { Schema, model, SchemaTypes } from 'mongoose'

import { TimetableDocument } from '../types/timetable.type'

const TimetableSchema: Schema = new Schema(
    {
        course: {
            type: Schema.Types.String,
            required: true
        },
        venue: {
            type: Schema.Types.String,
            required: true
        },
        type: {
            type: Schema.Types.String,
            enum: ['exam', 'lecture'],
            default: 'exam'
        },
        startTime: {
            type: Schema.Types.String,
            required: true
        },
        endTime: {
            type: Schema.Types.String,
            required: true
        },
        lecturer: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    },
)

const Timetable = model<TimetableDocument>('Timetable', TimetableSchema)

export { Timetable }
