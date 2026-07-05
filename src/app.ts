import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express"
import config from "./config";
import cors from "cors"
import { prisma } from "./lib/prisma";
import HttpStatus from "http-status";

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
app.get("/api/user/register", async (req: Request, res: Response) => {
    const payload = req.body;
    console.log(payload);
    res.status(HttpStatus.CREATED).json({
        message: "User Register Successfully"
    })
})

export default app;
