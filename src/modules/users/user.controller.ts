import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import HttpStatus from "http-status";
import { userService } from "./user.service";


const RegisterUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const user = await userService.RigisterUserIntoDB(payload)

        res.status(HttpStatus.CREATED).json({
            success: true,
            successStatus: HttpStatus.CREATED,
            message: "User Register Successfully",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(HttpStatus.CREATED).json({
            success: true,
            successStatus: HttpStatus.CREATED,
            message: "User Register Successfully",
            data: {
                user
            }
        })
    }
}
export const userController = {
    RegisterUser
}