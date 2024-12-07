import app from "./app";
import mongoose from 'mongoose'
import config from "./app/config";

const port = config.port || 3000;

// database and server site connect
async function connectdatabase() {
    try {
        await mongoose.connect(config.database_url as string);
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.log(err)

    }

}
connectdatabase()


