// This is where the actual work happens. The schema said askBill *exists*;
// this file says what it actually *does* when someone calls it.

// The shape of this object has to mirror the schema: askBill sat under Query
// there, so its function sits under Query here. That's how GraphQL knows which
// function answers which query — it matches them up by this structure.

export const resolvers = {
    Query: {

        // GraphQL hands a resolver a few arguments. I only need the second one, `args`, which carries what the client sent in (billText and question).
        // The first argument isn't useful for a top-level query like this, so I name it `_` — a common way of saying "yes it's here, I'm ignoring it on purpose".
        askBill: (_, args) => {
            // Hardcoded on purpose for now. I want to prove the GraphQL pipe works end to end before adding the AI, so there's only one new thing to debug
            // at a time. I echo the question back so I can *see* the input actually arriving. The returned object has to match the BillAnswer shape from the
            // schema — an object with an `answer` field — or GraphQL rejects it.
            return {
                answer: `You asked: "${args.question}". (Placeholder answer - the AI gets wired in next)`,
            };
        },
    },
};