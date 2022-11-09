import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

import { User } from '../types/user.type'

function isAuthorized() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { role } = req.user as User

    if (role !== 'admin') {
      throw createHttpError(401, 'Not sufficient rights')
    }

    next()
  }
}

export { isAuthorized }
