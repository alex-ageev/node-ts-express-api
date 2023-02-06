import { User } from "../models/User";
import { Role } from "../models/Role";
import bcrypt from "bcryptjs";
import TokenService from "./TokenService";
import ApiError from "../exceptions/ApiError";

class AuthService {
  async login(username: string, password: string) {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      throw new Error("User ${username} not found");
    }

    // encontramos o user, falta comparar as passwords
    const validPassword = bcrypt.compareSync(password, foundUser.password);

    if (!validPassword) {
      throw new Error("Password invalid");
    }

    const tokens = TokenService.generateTokens(foundUser);
    await TokenService.saveToken(String(foundUser._id), tokens.refreshToken);
    return {
      ...tokens,
      foundUser,
    };
  }

  async registration(username: string, password: string): Promise<any> {
    // desestruturação do objeto body
    const candidate = await User.findOne({ username: username });
    // caso encontramos a pessoa com username igual
    if (candidate) {
      throw ApiError.BadRequest("User already exists.");
    }

    /*
      https://www.npmjs.com/package/bcryptjs
      primeiro parametro mandamos a password
      e segundo será o nível de hashing
    */
    const hashPassword = bcrypt.hashSync(password, 7);
    /*
      procuramos na bd a Role USER
    */
    const userRole = await Role.findOne({ value: "USER" });

    // se existe
    if (userRole) {
      /*
        Agora as passwords não serão guardados em texto simples
      */
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      const createdUser = await user.save();
      const tokens = TokenService.generateTokens(createdUser);
      await TokenService.saveToken(
        String(createdUser._id),
        tokens.refreshToken
      );
      return { ...tokens, createdUser };
    } else {
      console.log("Role not found");
    }
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("Refresh token not found");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError("Invalid refresh token");
    }
    
    const foundUser = await User.findById(userData.id);
    console.log(foundUser);
    const tokens = TokenService.generateTokens(foundUser);
    await TokenService.saveToken(String(userData.id), tokens.refreshToken);

    return {
      ...tokens,
      foundUser,
    };
  }
  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async validPassword(user: any, foundUser: any) {
    return bcrypt.compareSync(user.password, foundUser.password);
  }

  async getAllUsers(): Promise<any> {
    const allUsers = await User.find();
    return allUsers;
  }
}

export default new AuthService();
