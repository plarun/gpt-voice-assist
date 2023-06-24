import express from "express";
export const router = express.Router();

import { requestGPT } from "../../gpt.js";

// @route  GET /api/gpt/
// @desc   Requests openai GPT and gets its response
// @access Public
router.get("/", (req, res) => {
  const { prompt } = req.query;

  console.log("gpt prompt: ", req.query);

  // Generate GPT response
  requestGPT(prompt)
    .then((completion) => {
      const text = completion.data.choices[0].text;
      console.log(completion.data, completion.data.choices);
      res.json({ GPTResponse: text });
    })
    .catch((error) => res.json({ GPTResponse: "", error }));
});
