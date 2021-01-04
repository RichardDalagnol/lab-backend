import { Router } from 'express';
import PathogenInSampleItemController from '@modules/Lab/infra/http/controller/PathogenInSampleItemController'

const pathogenInSampleItemRouter = Router();

const pathogenInSampleItemController = new PathogenInSampleItemController;

pathogenInSampleItemRouter.post('/', pathogenInSampleItemController.create);
pathogenInSampleItemRouter.get('/', pathogenInSampleItemController.list);
pathogenInSampleItemRouter.put('/', pathogenInSampleItemController.update);
pathogenInSampleItemRouter.get('/:id', pathogenInSampleItemController.findById);
pathogenInSampleItemRouter.delete('/:id', pathogenInSampleItemController.delete);



export default pathogenInSampleItemRouter;
