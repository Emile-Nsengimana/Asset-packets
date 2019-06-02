import hash from 'bcrypt';
import con from '../config/dbConnection';
import userTable from '../db/userTable';
import generateToken from '../helpers/generateToken';
import processPassword from '../helpers/processPassword';

class userController {
  // add a new user
  static async registerUser(req, res) {
    try {
      const {
        firstName, lastName, gender, department, type, email,
        phoneNo, password, isAdmin,
      } = req.body;
      const hashedPassword = processPassword.hashPassword(password);
      const register = await con.query(userTable.addUser,
        [firstName, lastName, gender, department, type, email, phoneNo, hashedPassword, 'active', isAdmin]);
      if (register.rowCount !== 0) {
        const token = await generateToken.signToken(req.body);
        return res.status(201).json({
          status: 201,
          message: 'user created',
          token,
        });
      }
      throw register;
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  // disable a user
  static async disableUser(req, res) {
    try {
      const user = await con.query(userTable.searchUser, [req.params.email]);
      if (user.rowCount !== 0) {
        await con.query(userTable.updateUser, [req.body.status, user.rows[0].userid]);
        return res.status(200).json({
          status: 200,
          message: `${user.rows[0].firstname} ${user.rows[0].lastname} has been disabled`,
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'user not found',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  //   remove a user
  static async removeUser(req, res) {
    try {
      const user = await con.query(userTable.searchUser, [req.params.email]);
      if (user.rowCount !== 0) {
        const deleteUser = await con.query(userTable.removeUser, [user.rows[0].email]);
        if (deleteUser.rowCount !== 0) {
          return res.status(200).json({
            status: 200,
            message: `${user.rows[0].firstname} ${user.rows[0].lastname} has been removed`,
          });
        }
        throw Error;
      }
      return res.status(404).json({
        status: 404,
        message: 'user not found',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  //   change user password
  static async resetPassword(req, res) {
    try {
      const findUSer = await con.query(userTable.searchUser, [req.params.email]);

      if (findUSer.rowCount !== 0) {
        const { oldPassword, password } = req.body;
        const passwordCompare = hash.compareSync(oldPassword, findUSer.rows[0].password);
        if (passwordCompare) {
          const hashedPassword = processPassword.hashPassword(password);
          await con.query(userTable.changePassword, [hashedPassword, findUSer.rows[0].userid]);
          return res.status(200).json({
            status: 200,
            message: 'password changed successfully',
          });
        }
        return res.status(401).json({
          status: 401,
          error: 'incorrect password',
        });
      }
      return res.status(404).json({
        status: 404,
        error: `user with ${req.params.email} not found`,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  // display all users
  static async getAllUsers(req, res) {
    try {
      const users = await con.query(userTable.users);
      if (users.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: users.rows,
        });
      }
      throw Error;
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'no user found',
      });
    }
  }
}
export default userController;
