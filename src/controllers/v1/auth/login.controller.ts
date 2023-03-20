import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DBConnect from 'lib/db';
import userModel from 'models/User.model';
import config from 'lib/config';

const login = async (req: Request, res: Response) => {
  try {
    await DBConnect();
    const user = await userModel.findOne({ email: req.body.email }).lean();
    const passwordOk = await bcrypt.compare(req.body.password, user.password);
    if (passwordOk) {
      const token = jwt.sign(user, config.secretKey);
      res.json({ token });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
export default login;
