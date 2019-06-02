import userSchema from '../helpers/schema';

class dataValidations {
  static validateUserInfo(req, res, next) {
    const {
      firstName, lastName, gender, phoneNo, email, password, confirmPassword, isAdmin,
    } = req.body;
    const newUser = userSchema.validate({
      firstName,
      lastName,
      gender,
      phoneNo,
      email,
      password,
      confirmPassword,
      isAdmin,
    });
    if (newUser.error) {
      if (newUser.error.details[0].type === 'passwordComplexity.base') {
        return res.status(400).json({
          status: 400,
          error: 'password length must be 8 with atleast an upper, lower case letter, and a number',
        });
      }
      if (newUser.error.details[0].path[0] === 'phoneNo') {
        return res.status(400).json({
          status: 400,
          error: 'invalid phone number',
        });
      }
      return res.status(400).json({
        status: 400,
        error: newUser.error.details[0].message.replace('"', ' ').replace('"', ''),
      });
    }
    //   verify password
    req.user = newUser.value;
    next();
  }

  static checkPassword(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: 'password doesn\'t match',
      });
    }
    next();
  }
}

export default dataValidations;
