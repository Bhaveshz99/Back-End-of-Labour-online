import { Types, Document } from 'mongoose';

export interface IOtp extends Document {
    userId: Types.ObjectId
    email: string
    otp: number
    mobile: number
    messageFor: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}