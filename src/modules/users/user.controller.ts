import { Request, Response } from "express";
import HttpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";


const RegisterUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await userService.RigisterUserIntoDB(payload)

    // res.status(HttpStatus.CREATED).json({
    //     success: true,
    //     successStatus: HttpStatus.CREATED,
    //     message: "User Register Successfully",
    //     data: user
    // })
    sendResponse(res, {
        success: true,
        successStatus: HttpStatus.CREATED,
        message: "User Register Successfully",
        data: { user }
    })
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const { accessToken } = req.cookies;
    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret) as JwtPayload;
    console.log("verify token :", verifiedToken);

    const profile = await userService.getMyProfileFromDB(req.user!.id);
    sendResponse(res, {
        success: true,
        successStatus: HttpStatus.OK,
        message: "User profile Retrived Successfully",
        data: { profile }
    })

});
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const updateProfile = await userService.updateMyProfileDB(userId, payload);

    sendResponse(res, {
        success: true,
        successStatus: HttpStatus.OK,
        message: "User profile is update",
        data: { updateProfile }
    })
})


export const userController = {
    RegisterUser, getMyProfile, updateMyProfile
}