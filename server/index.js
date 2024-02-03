/**
 * Connects to MongoDB database, configures Express app,
 * sets up routes and starts listening for requests on port 5000
 */
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
try {
    connectToMongo();
    const app = express();
    const port = 5000;
    app.use(cors());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/api/notes", require("./routes/notes"));
    app.use("/api/auth", require("./routes/auth"));

    app.listen(port, () => {
        console.log(`Listening the app at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
