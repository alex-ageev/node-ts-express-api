import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  roles: string[];
}
class TokenService {
  generateTokens(user: any) {
    const id = user.id;
    const roles: String[] = user.roles;

    const payload = {
      id,
      roles,
    };

    console.log(payload);
    const accessToken = jwt.sign(
      payload,
      String(process.env.SECRET_KEY_ACCESS),
      { expiresIn: "30d" }
    );

    return { accessToken };
  }
}

export default new TokenService();
