import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.jwt_access_key, {expiresIn: '1d'})
        const refreshToken = jwt.sign(payload, process.env.jwt_refresh_key, {expiresIn: '7d'})
        return {
            accessToken,
            refreshToken
        }
    }
}

export default new TokenService();