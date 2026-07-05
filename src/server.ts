import app from "./app";
const PORT = 5000;

const main = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`server is running port ${PORT}`);
        })
    } catch (error) {
        console.error(error);
    }
}
main();