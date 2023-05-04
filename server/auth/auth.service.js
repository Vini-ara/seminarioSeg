import { jwt } from "jsonwebtoken"

export class AuthService {
  generateAccessToken(id, name, is_admin) {
    const payload = { sub: id, name, is_admin }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2 days' })

    return { 
      accessToken, 
      expiresIn: 60*60*24*2 // dois dias
    }
  }
}
