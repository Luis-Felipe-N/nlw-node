import { Request, Response } from "express";

import { AutheticateUserServices } from "../services/AuthenticateUserServices";

class AutheticateUserController {
    async handle( request: Request, response: Response ) {
        const code = request.body
        const service = new AutheticateUserServices()
        const result = await service.execute( code )

        return response.json(result)
    }
}

export { AutheticateUserController }