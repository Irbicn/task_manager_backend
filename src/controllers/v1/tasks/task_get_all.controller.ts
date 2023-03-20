import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'lib/config';
import DBConnect from 'lib/db';
import taskModel from 'models/task.model';

const getAll = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(400).json({
      token: false,
    });
  }
  const token = auth.substring(7, auth.length);
  jwt.verify(token, config.secretKey, async (err, user) => {
    if (err || !user || typeof user === 'string') {
      return res.status(400).json({
        token: false,
      });
    }
    try {
      await DBConnect();
      const allTasks = await taskModel.find({ user_id: user._id }).lean();
      console.log(allTasks);
      res.json({ allTasks });
    } catch (err: any) {
      console.error(err.message);
      res.json({ message: err.message });
    }
  });
};

export default getAll;
