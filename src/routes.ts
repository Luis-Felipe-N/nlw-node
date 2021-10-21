import express from 'express'
import { AutheticateUserController } from './controllers/AutheticateUserController'

const router = express.Router()

router.post('/authenicate', new AutheticateUserController().handle)

export { router }