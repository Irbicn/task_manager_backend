import { Router } from 'express';
import taskAdd from '@controllers/v1/tasks/task_add.controller';
import getAll from '@controllers/v1/tasks/task_get_all.controller';
import getById from '@controllers/v1/tasks/task_get_by_id';
import edit from '@controllers/v1/tasks/task_edit.controller';
import taskDelete from '@controllers/v1/tasks/task_delete.controller';
import done from '@controllers/v1/tasks/task_done.controller';

const taskRouter = Router();

taskRouter.post('/add', taskAdd);
taskRouter.get('/', getAll);
taskRouter.get('/getbyid/:id', getById);
taskRouter.post('/edit/:id', edit);
taskRouter.get('/delete/:id', taskDelete);
taskRouter.get('/done/:id', done);

export default taskRouter;
