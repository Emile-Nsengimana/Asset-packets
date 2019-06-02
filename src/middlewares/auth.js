import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const verifyMe = (req, res, next) => {
  const head = req.headers.token;
  jwt.verify(head, process.env.SECRET_KEY, (error, dcrypt) => {
    if (error) {
      return res.status(401).json({ status: 401, error: 'please login first' });
    }
    req.user = dcrypt;
    next();
  });
};

export default verifyMe;
