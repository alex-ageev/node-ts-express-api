import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface ITokenPayload {
  id: string,
  roles: string[];
}
class TokenService {
  generateTokens(user: any) {
    const id = user.id;
    const roles: string[] = user.roles;

    const payload: ITokenPayload = {
      id,
      roles,
    };
    const accessToken = jwt.sign(
      payload,
      String(process.env.SECRET_KEY_ACCESS),
      { expiresIn: "30d" }
    );

    return { accessToken };
  }
}

export default new TokenService();
