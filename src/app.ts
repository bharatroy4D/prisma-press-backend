import express, { Application, Request, request, Response } from "express"

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Prisma')
})

export default app;
