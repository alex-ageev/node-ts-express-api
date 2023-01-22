import { User } from "../models/User";
import { Role } from "../models/Role";
import bcrypt from "bcryptjs";

class AuthService {
  async foundUser(user: any) {
    return await User.findOne({ username: user.username });
  }

  async registration(user: any): Promise<any> {
    // desestruturação do objeto body
    const { username, password } = user;
    // caso encontramos a pessoa com username igual

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

      return createdUser;
    } else {
      console.log("Role not found");
    }
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
