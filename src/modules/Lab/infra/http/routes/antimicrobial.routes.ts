import { Router } from 'express';
import AntimicrobialController from '@modules/Lab/infra/http/controller/AntimicrobialController'

const antimicrobialRouter = Router();

const antimicrobialController = new AntimicrobialController;


antimicrobialRouter.post('/', antimicrobialController.create);
antimicrobialRouter.get('/', antimicrobialController.list);
antimicrobialRouter.put('/', antimicrobialController.update);
antimicrobialRouter.get('/:id', antimicrobialController.findById);
antimicrobialRouter.delete('/:id', antimicrobialController.delete);



export default antimicrobialRouter;
