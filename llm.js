import ollama from "ollama";

// The local model to use. Kept as a single constant so switching models later (e.g. to qwen3:14b for a stronger reasoning) is a one-line change.

const MODEL = "llama3:latest";

// Instructions that set how the model should behave. Keeping it relevant only to bill and telling it not to invent 
// any other information which is not related to charges or any irrelevant thing on the bill
const SYSTEM_PROMPT = `You are helpful assistant that explains a customer's phone bill.
    Answer using ONLY the information in the provided bill.
    If the answer isn't in the bill, say simply that the information is not available rather than guessing.
    Explain clearly and simply, as if to a non-technical customers.`;


// Given the bill text and a question, ask the local model and then return it's answer.
// async because talking to model takes time and returns a promise.

export async function askLLM({billText, question}) {

    const response = await ollama.chat({
        model: MODEL,
        messages: [
            { role : "system", content: SYSTEM_PROMPT},
            { role: "user", content: `Here is the bill:\n${billText}\n\nQuestion: ${question}`},
        ],
    });

    // The library returns an object. The answer text lives at the message.content.
    return response.message.content;
    
}
