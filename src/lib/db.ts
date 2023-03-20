import { connect } from 'mongoose';
import config from './config';

const DBConnect = async () => {
  try {
    const db = await connect(config.mongodburi);
    console.log('db connected to', db.connection.name);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default DBConnect;
