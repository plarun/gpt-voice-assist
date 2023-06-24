import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import { router as gpt } from "./routes/api/gpt.js";

const app = express();

app.use(cors({ origin: "*" }));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/gpt", gpt);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Server running on port ${port}`));
