import { Router } from 'express'
import userRouter from '@modules/User/infra/http/routes/user.routes'
import pathogenRouter from '@modules/Lab/infra/http/routes/pathogen.routes'
import antimicrobialRouter from '@modules/Lab/infra/http/routes/antimicrobial.routes'
import requesterRouter from '@modules/Lab/infra/http/routes/requester.routes'
import sessionRouter from '@modules/User/infra/http/routes/session.routes'
import sampleRouter from '@modules/Lab/infra/http/routes/sample.routes'
import pathogenInSampleItemRouter from '@modules/Lab/infra/http/routes/pathogenInSampleItem.routes'
import AuthMiddleware from '@modules/User/infra/http/middlewares/Auth'

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/user', userRouter);

routes.use(AuthMiddleware);
routes.use('/pathogen', pathogenRouter);
routes.use('/antimicrobial', antimicrobialRouter);
routes.use('/requester', requesterRouter);
routes.use('/sample', sampleRouter);
routes.use('/pathogen-itens', pathogenInSampleItemRouter);


export default routes;