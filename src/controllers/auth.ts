import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { user } from '../models/user'
import bcrypt from 'bcryptjs'

export default {
    register: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body

            const exists = await user.findOne({ email })

            if (exists) throw createHttpError(409, 'User already exists!')

            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new user({
                email, password: hashedPassword
            })
            const saveUser = await newUser.save()

            if (!saveUser) throw createHttpError(400, 'Failed to register user!')

            res.status(200).json('Successfully registered')
        } catch (err) {
            next(err)
        }
    }
    ,
    login: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body

            const findUser = await user.findOne({ email }).lean()

            if (!findUser || !findUser.password) { throw createHttpError(400, 'Something went wrong') }
            await bcrypt.compare(password, findUser.password).then(response => {
                res.status(200).json(response ? 'Success' : 'Failed')
            })

        } catch (err) {
            next(err)
        }
    }
}