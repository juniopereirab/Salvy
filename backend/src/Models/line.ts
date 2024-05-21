import { Schema, model, Document } from 'mongoose'
import Joi from 'joi'

export const LineSchemaValidate = Joi.object({
    ddd: Joi.number().required(),
    plan: Joi.number().required(),
    email: Joi.string().required(),
    idempotencyKey: Joi.string(),
    pending: Joi.boolean(),
    phoneNumber: Joi.string(),
})

export interface ILine {
    ddd: number
    plan: number
    email: string
    idempotencyKey: string
    pending: boolean
    phoneNumber?: string
}

export interface ILineDoc extends ILine, Document {}

const LineSchema = new Schema<ILineDoc>({
    ddd: {
        type: Number,
        required: true
    },
    plan: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    idempotencyKey: {
        type: String,
        required: true,
    },
    pending: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: String,
    }
})

LineSchema.pre<ILineDoc>('save', function (next) {
    if (!this.phoneNumber) {
        this.pending = true;
    } else {
        this.pending = false;
    }

    next();
})

export const Line = model<ILineDoc>('Line', LineSchema)