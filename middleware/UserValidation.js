import jwt from "jsonwebtoken";
import app from "../index.js"


class UserValidation{
    // verifyToken(req, res) {
    //     const token = req.headers['x-access-token'];
    //     if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    
    //     jwt.verify(token, app.locals.secretkey, (err, decoded) => {
    //         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    //         // если все хорошо, сохраняем в запросе для использования в других маршрутах
    //         req.userId = decoded.id;
    //     });
    // }
    
    validateInput(body) {
        const { username, password, email, firstname, lastname } = body;
    
        // Проверка на английские символы
        if(username == "" || password == "" || email == ""  || firstname == "" || lastname == ""){
            let error = {}
            if(username == ''){
                error.username = 'Поле Логин не должно быть пустым'
            }
            if(password == ""){
                error.password = 'Поле Пароль не должен быть пустым'
            }
            if(email == ""){
                error.email = 'Поле Email не должен быть пустым'
            }
            if(firstname == ""){
                error.first_name = 'Поле Имя не должно быть пустым'
            }
            if(lastname == ""){
                error.last_name = 'Поле Фамилия не дожна быть пустым'
            }
            return error
        }

        

        const englishCheck = /^[A-Za-z0-9]+$/;
        if (!englishCheck.test(username)) {
            return { username : 'Логин допустим только на латинице и не должен содержать пробелов.' }
        }
        if(!englishCheck.test(password)){
            return { password:"Пароль допустим только на латинице и не должен содержать пробелов." }
        }
        // Проверка длины логина и пароля
        if (username.length < 4 ) {
            return {username : "Длина логина должна быть не меньше 4 символов"}
        }
        if (password.length < 6) {
            return {password : "Длина пароля должна быть не меньше 6 символов"}
        }
    
        // Проверка электронной почты
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailCheck.test(email)) {
            return { email: 'Адрес электронной почты введет некорректно.' }
        }
    }
}

export default new UserValidation()