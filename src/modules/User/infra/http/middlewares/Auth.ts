import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  adm: boolean;
  sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('O token deve ser informado')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret);


    const { sub, adm } = decoded as ITokenPayload;

    req.user = {
      adm: adm,
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token inválido!')
  }
}