import axios from 'axios'
import prismaClient from '../prisma'
import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}
class AuthenticateUserServices {

    async execute( code: string ) {
        const url = 'thhps://github.com/login/oauth/access_token'
        console.log(code)
        const { data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null , {
            params: {
                client_id:  process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                'Accept': "application/json"
            }
        })
        console.log(accessTokenResponse)

        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const { name, avatar_url, login, id } = response.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if( !user ) {
            // Criando usuário
            user = await prismaClient.user.create({
                data: {
                    avatar_url,
                    name,
                    github_id: id,
                    login
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                github_id: user.github_id
            }
        },
        ""
        )

        return response.data
    }
}

export { AuthenticateUserServices }