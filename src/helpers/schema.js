import joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
};

const userSchema = joi.object().keys({
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  gender: joi.string().valid('male', 'female').required(),
  phoneNo: joi.string().trim().regex(/^[0-9]{10,13}$/).required(),
  email: joi.string().email().required(),
  password: new PasswordComplexity(complexityOptions).required(),
  confirmPassword: joi.string().required(),
  isAdmin: joi.boolean(),
});

export default userSchema;
