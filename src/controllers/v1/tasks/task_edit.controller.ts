import { Request, Response } from 'express';
import DBConnect from 'lib/db';
import taskModel from 'models/task.model';

const edit = async (req: Request, res: Response) => {
  try {
    await DBConnect();
    const task = await taskModel
      .findByIdAndUpdate(req.params.id, req.body)
      .lean();
    console.log(task, req.params);
    res.json({ task });
  } catch (err: any) {
    console.error(err.message);
    res.json({ message: err.message });
  }
};

export default edit;
