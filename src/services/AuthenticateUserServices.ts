import axios from 'axios'

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

        const response = await axios.get('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const 
        return response.data
    }
}

export { AuthenticateUserServices }