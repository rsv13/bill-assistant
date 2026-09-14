// Importing the AI function to be able to use for solving queries.

import { askLLM } from "./llm.js";


// This is where the actual work happens. The schema said askBill *exists*;
// this file says what it actually *does* when someone calls it.

// The shape of this object has to mirror the schema: askBill sat under Query
// there, so its function sits under Query here. That's how GraphQL knows which
// function answers which query — it matches them up by this structure.

export const resolvers = {
    Query: {

        // GraphQL hands a resolver a few arguments. I only need the second one, `args`, which carries what the client sent in (billText and question).
        // The first argument isn't useful for a top-level query like this, so I name it `_` — a common way of saying "yes it's here, I'm ignoring it on purpose".
        // Added the async because it waits for the AI to respond.
        askBill: async (_, args) => {

            // Hand the bill and question to the model and wait for the real answer.
            const answer = await askLLM({
                billText: args.billText,
                question: args.question,
            });

            return { answer };
        },
    },
};