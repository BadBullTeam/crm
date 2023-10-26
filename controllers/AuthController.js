import AuthService from '../services/AuthService.js';

class AuthController {
  async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      if (result.error) {
        return res.status(400).send({ error: result.error });
      }
      return res.status(200).send({ auth: true });
    } catch (err) {
      console.log({ err })
      return res.status(500).send({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      if (result.error) {
        return res.status(401).send({ error: result.error });
      }
      res.cookie('access_token', result.tokens.refreshToken, {  
        maxAge: 36000,
        httpOnly: true,
      })
      return res.status(200).send(result.user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
    
  }
}

export default new AuthController();