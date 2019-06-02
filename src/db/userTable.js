const userTable = `
CREATE TABLE IF NOT EXISTS users (
        userId serial primary key,
        firstName varchar(30) NOT NULL,
        lastName varchar(25) NOT NULL,
        gender varchar(15),
        department varchar(15),
        type varchar(10),
        email varchar(30) UNIQUE,
        phoneNo varchar(15),
        password varchar(100) NOT NULL,
        status varchar(15),
        isAdmin boolean DEFAULT 'false'
    )`;
const addUser = `insert into users (
    firstName,
    lastName,
    gender, 
    department, 
    type,
    email,
    phoneNo,
    password,
    status,
    isAdmin
    )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from users where email = ($1)';
const searchUser = 'select * from users where email = ($1)';
const updateUser = 'update users set status = ($1) where userid=($2)';
const changePassword = 'update users set password = ($1) where userid=($2)';
const users = 'select * from users';
export default {
  userTable,
  addUser,
  removeUser,
  searchUser,
  updateUser,
  changePassword,
  users,
};
