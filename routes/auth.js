import express from "express"
import AuthController from '../controllers/AuthController.js'
const auth = express.Router();

auth.post('/register', AuthController.register);
auth.post('/login', AuthController.login);
auth.get('/activate/:link')
export default auth;