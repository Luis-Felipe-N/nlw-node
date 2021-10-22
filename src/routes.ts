import express from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'

const router = express.Router()

router.post('/authenticate', new AuthenticateUserController().handle)

export { router }