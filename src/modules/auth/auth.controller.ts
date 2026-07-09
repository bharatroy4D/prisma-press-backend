import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.userLoginIntoDB(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 //24 hours or 1 day
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 day
    })

    sendResponse(res, {
        success: true,
        successStatus: HttpStatus.OK,
        message: "user Login is Successfully",
        data: { accessToken, refreshToken }
    })
})

export const authController = {
    userLogin
}