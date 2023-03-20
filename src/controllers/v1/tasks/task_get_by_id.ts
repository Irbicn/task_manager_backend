import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'lib/config';
import DBConnect from 'lib/db';
import taskModel from 'models/task.model';

const getById = async (req: Request, res: Response) => {
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
      const task = await taskModel.findById(req.params.id).lean();
      res.json({ task });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  });
};

export default getById;
