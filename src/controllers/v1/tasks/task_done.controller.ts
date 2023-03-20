import { Request, Response } from 'express';
import DBConnect from 'lib/db';
import taskModel from 'models/task.model';

const done = async (req: Request, res: Response) => {
  try {
    await DBConnect();
    const task = await taskModel.findById(req.params.id);
    task.done = !task.done;
    await task.save();
    res.json({ task });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export default done;
