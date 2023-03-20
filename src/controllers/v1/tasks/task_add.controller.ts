import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'lib/config';
import DBConnect from 'lib/db';
import taskModel from 'models/task.model';

const taskAdd = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  const token = auth.substring(7, auth.length);
  jwt.verify(token, config.secretKey, async (err, user) => {
    try {
      if (err || !user) {
        return res.status(400).json({
          token: false,
        });
      }
      if (typeof user !== 'string') {
        await DBConnect();
        const { title, description } = req.body;
        const task = new taskModel({ title, description, user_id: user._id });
        const savedTask = await task.save();
        res.json({ savedTask });
      }
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  });
};
export default taskAdd;
