import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { router as gpt } from "./routes/api/gpt.js";

const app = express();

app.use(cors({ origin: "*" }));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/gpt", gpt);

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Server running on port ${port}`));
