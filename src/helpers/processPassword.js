import hash from 'bcrypt';
import userTable from '../db/userTable';

class Password {
  // hash password
  static hashPassword(key) {
    const hashedPassword = hash.hashSync(key, 10);
    return hashedPassword;
  }
}

export default Password;
