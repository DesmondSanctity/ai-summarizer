import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

/** middlewares */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack


const port = process.env.PORT || 8000;

/** HTTP GET Request */
app.get("/", (req, res) => {
    res.status(201).json("Home GET Request");
});

/** api routes */
app.use("/api/summarize", summarizeRouter);

/** start server only when we have valid connection */

app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
});


export default app;
