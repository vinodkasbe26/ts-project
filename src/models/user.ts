import { model, ObjectId, Schema } from "mongoose";

export interface IUser {
    _id: ObjectId
    email: string,
    password: string,
}

const userSchema: Schema<IUser> = new Schema({
    email: String,
    password: String,

}, { timestamps: true })

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
//   }

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

export const user = model<IUser>('Users', userSchema)