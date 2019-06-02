import con from './dbConnection';
import userTable from '../db/userTable';

async function dbSetup() {
  await con.query(userTable.userTable);
}
dbSetup();
export default dbSetup;
