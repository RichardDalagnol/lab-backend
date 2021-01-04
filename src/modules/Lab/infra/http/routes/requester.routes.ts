import { Router } from 'express';
import RequesterController from '@modules/Lab/infra/http/controller/RequesterController'

const requesterRouter = Router();

const requesterController = new RequesterController;


requesterRouter.post('/', requesterController.create);
requesterRouter.get('/', requesterController.list);
requesterRouter.put('/', requesterController.update);
requesterRouter.get('/:id', requesterController.findById);
requesterRouter.delete('/:id', requesterController.delete);



export default requesterRouter;
