import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express"
import config from "./config";
import cors from "cors"
import { prisma } from "./lib/prisma";
import HttpStatus from "http-status";
import bcrypt from "bcryptjs";

const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello Prisma')
})
app.post("/api/user/register", async (req: Request, res: Response) => {
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
    const user = prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
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

export default app;
