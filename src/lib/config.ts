import { config } from 'dotenv';

config();

export default {
  mongodburi: process.env.MONGODBURI || '',
  secretKey: process.env.SECRETKEY || '',
};
