import { Router } from 'express';
import SampleController from '@modules/Lab/infra/http/controller/SampleController'

const sampleRouter = Router();

const sampleController = new SampleController;


sampleRouter.post('/', sampleController.create);
sampleRouter.get('/', sampleController.list);
sampleRouter.put('/', sampleController.update);
sampleRouter.get('/:id', sampleController.findById);
sampleRouter.delete('/:id', sampleController.delete);



export default sampleRouter;
