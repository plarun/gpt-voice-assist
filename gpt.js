import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const GPT_DAVINCI_MODEL = "text-davinci-003";

// GPT configuration with openai api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// openai instance
export const openai = new OpenAIApi(configuration);

export async function requestGPT(prompt) {
  const completion = await openai.createCompletion({
    model: GPT_DAVINCI_MODEL,
    prompt: prompt,
    max_tokens: 1024,
  });

  // const text = completion.data.choices[0].text;
  return completion;
}
