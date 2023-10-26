import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import UserValidation from "../middleware/UserValidation.js";
import UserQueries from '../db/userqueries.js';
import TokenService from "./TokenService.js";
import TokenQueries from "../db/tokenqueries.js";
import EmailService from "./EmailService.js"


class AuthService {
  async register(body) {
    const {username, password, confirmPassword, firstname, lastname, email, isactivation } = body;
    console.log({username, password, confirmPassword, firstname, lastname, email})
    if (password !== confirmPassword) {
      return { error: {password: 'Пароли не совпадают', password_repeat: 'Пароли не совпадают'} };
    }

    let error = UserValidation.validateInput(body);
    if(error){
      return { error };
    }

    const userExists = await UserQueries.checkUserExists(username);
    const emailExists = await UserQueries.checkEmailExists(email);
    error = {};
    if (userExists.rows[0].exists) {
      error.username = "Пользователь с указанным логином уже существует.";
    }
    if (emailExists.rows[0].exists) {
      error.email = "Пользователь с указанным Email уже существует.";
    }
    if(Object.entries(error).length){
      return { error };
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const id = uuidv4();
    const activationLink = uuidv4();
    await UserQueries.insertUser(id, username, hashedPassword, firstname, lastname, email, false, activationLink);
    
    // await EmailService.sendActivationMail(email, `${process.env.api_url}/activate/${activationLink}`);
    return {};
  }

  async login(body) {
    const { username, password } = body;

    let user = await UserQueries.getUserByUsername(username);
    
    if (!user) {
      return { error : { username : "Не найден пользователь" }};
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    
    if (!passwordIsValid) {
      return { error : { password : "Неправильный пароль" }};
    }
    const tokens = TokenService.generateTokens({ id: user.id });
    await TokenQueries.insertToken(user.id , tokens.refreshToken)
    return { 
        user: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        },
        tokens : tokens
     };
  }
}

export default new AuthService();