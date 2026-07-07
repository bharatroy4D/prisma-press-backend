import { Request, Response } from "express";
import HttpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";


const RegisterUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await userService.RigisterUserIntoDB(payload)

    res.status(HttpStatus.CREATED).json({
        success: true,
        successStatus: HttpStatus.CREATED,
        message: "User Register Successfully",
        data: { user }
    })
});

export const userController = {
    RegisterUser
}