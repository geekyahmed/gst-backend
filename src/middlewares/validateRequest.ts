import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { logger, sendResponse } from "../configs";

const validateRequest = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (e: any) {
        logger.error(e);
        return sendResponse(res, 400, e.errors[0], e.errors)
        // return res.status(400).send(e.errors);
    }
};

export default validateRequest;