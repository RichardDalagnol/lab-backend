import { Router } from 'express';
import PathogenController from '@modules/Lab/infra/http/controller/PathogenController'
import multer from 'multer'
import uploadConfig from '@config/upload';

const pathogenRouter = Router();

const upload = multer(uploadConfig);
const pathogenController = new PathogenController;


pathogenRouter.post('/', pathogenController.create);
pathogenRouter.get('/', pathogenController.list);
pathogenRouter.put('/', pathogenController.update);
pathogenRouter.get('/:id', pathogenController.findById);
pathogenRouter.delete('/:id', pathogenController.delete);


// pathogenRouter.patch('/', upload.single('imagem'), async (req, res) => {
//   try {
//     const imagem = req.file

//     const pathogenService = new PathogenService();

//     const pathogen = await pathogenService.save({ nome, descricao });
//     return res.json(pathogen);
//   } catch (err) {
//     return res.status(400).json({ error: err.message })
//   }
// });




export default pathogenRouter;
