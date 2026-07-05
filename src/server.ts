import app from "./app";
import { prisma } from "./lib/prisma";
import "dotenv/config";

const PORT = process.env.PORT;

const main = async () => {
    try {
        // await prisma.$connect();
        // console.log("connect to the databse successfully");
        app.listen(PORT, () => {
            console.log(`server is running port ${PORT}`);
        })
    } catch (error) {
        console.error(error);
        // await prisma.$disconnect();
        process.exit(1)
    }
}
main();