import db from "./db.js";
class UserQueries{
    async checkUserExists(username) {
        return await db.query(
          "SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)",
          [username]
        );
      }
      
    async checkEmailExists(email) {
        return await db.query(
          "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)",
          [email]
        );
      }
      
    async insertUser(id, username, hashedPassword, firstname, lastname, email, isactivation, activationlink) {
        return await db.query(
          "INSERT INTO users (id, username, password, firstName, lastName, email, isactivation, activationlink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [id, username, hashedPassword, firstname, lastname, email, isactivation, activationlink]
        );
      }
      
     async getUserByUsername(username) {
        let user = await db.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );
        return user.rows[0];
      }
      async getUserByActivationLink(activationLink){
        let user = await db.query(
          "SELECT * FROM users WHERE activationlink = $1",
          [activationLink]
        );
        return user.rows[0];
      }
      async updateUserActivationStatus(isactivation){
        return await db.query(
          "UPDATE users SET isactivation = $1 WHERE id = $2",
          [isactivation, userId]
        )
      }
}
export default new UserQueries();