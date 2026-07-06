import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import HttpStatus from "http-status";

const router = Router();


router.post("/register", async (req: Request, res: Response) => {
    const { name, email, password, profilePhoto } = req.body;

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });
    if (isUserExist) {
        throw new Error("user with this email already exists")
    };

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }

    })
    await prisma.profile.create({
        data: {
            userId: createdUser.id,
            profilePhoto
        }
    })
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    res.status(HttpStatus.CREATED).json({
        success: true,
        successStatus: HttpStatus.CREATED,
        message: "User Register Successfully",
        data: {
            user
        }
    })
})
export const userRouter = router;