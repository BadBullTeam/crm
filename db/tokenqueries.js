import db from "./db.js";
class TokenQueries{
    async insertToken(userId, refreshToken){
        return await db.query(
            "INSERT INTO token(userid, refreshtoken) VALUES ($1, $2) ON CONFLICT (userid) DO UPDATE SET refreshtoken = $2;", 
            [userId, refreshToken]
            )
            }
}
export default new TokenQueries()