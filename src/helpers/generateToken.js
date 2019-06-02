import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class tokenGenerator {
  static async signToken(user) {
    const jwtoken = await jwt.sign({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
    }, process.env.SECRET_KEY);
    return jwtoken;
  }
}
export default tokenGenerator;
