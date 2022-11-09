import { Response } from 'express'

interface LooseObject {
    [name: string]: any;
}

async function sendResponse(res: Response, status: number, msg: string, data?: LooseObject | any) {
    return res.status(status).json({
        status,
        msg,
        data
    })
}

export { sendResponse }