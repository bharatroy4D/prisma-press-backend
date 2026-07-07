import { Response } from "express"

type TMeta = {
    page: number,
    limit: number,
    total: number
}

type TResponseData<T> = {
    success: boolean,
    successStatus: number,
    message: string,
    data: T,
    meta?: TMeta
}
export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.successStatus).json({
        success: data.success,
        successStatus: data.successStatus,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
} 