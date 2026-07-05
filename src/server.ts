import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port;

const main = async () => {
    try {
        await prisma.$connect();
        console.log("connect to the databse successfully");
        app.listen(port, () => {
            console.log(`server is running port ${port}`);
        })
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1)
    }
}
main();