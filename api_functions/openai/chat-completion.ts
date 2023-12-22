import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function chatCompletion({
  prompt,
  maxTokens = 100,
  temperature = 0.9,
  topP = 1,
  frequencyPenalty = 0,
  presencePenalty = 0.6,
  stop = ["\n"],
}: {
  prompt: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stop: string[];
}) {
  const gptResponse = await openai.completions.create({
    model: "davinci",
    prompt: prompt,
    max_tokens: maxTokens,
    temperature: temperature,
    top_p: topP,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    stop: stop,
  });
  return gptResponse.choices;
}
