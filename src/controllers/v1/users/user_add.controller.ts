import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import DBConnect from 'lib/db';
import userModel from 'models/User.model';
import jwt from 'jsonwebtoken';
import config from 'lib/config';

const userAdd = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    await DBConnect();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, email, password: hashPassword });
    const savedUser = await newUser.save();
    const token = jwt.sign(
      {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
      config.secretKey
    );
    res.json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
export default userAdd;
