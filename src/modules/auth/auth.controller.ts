import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userResults = await authService.userLoginIntoDB(payload);

    sendResponse(res, {
        success: true,
        successStatus: HttpStatus.OK,
        message: "user Login is Successfully",
        data: userResults
    })
})

export const authController = {
    userLogin
}