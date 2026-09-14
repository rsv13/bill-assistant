// The schema is the contract for our whole API: it declares what a client
// can ask for and the exact shape of what comes back. Nothing works unless it's declared first.

// We write the schema using GraphQL's own Schema Definition Language (SDL),
// kept in a plain string. The `#graphql` tag on the first line is a hint to 
// editors sp they syntax-highlist the GraphQL inside this template literal

export const typeDefs = `#graphql
    # An object describing the shape of an answer.
    # For now an answer is just text. We can add fields later (e.g. confidence note)
    # without breaking existing clients - a key reason GraphQL scales well.
    type BillAnswer {
        answer : String! 
        #"!" means this field is non-nullalble. It will always be present.
        }
        
    # The special Query type lists every read operation the API allows.
    # A client can only ask what appears here.
    
    type Query {
        # askBill takes two required arguments (the bill's text and the question)
        # and returns a BillAnswer. The "!" on each argument makes it required.
        askBill(billText: String!, question: String!): BillAnswer!
        }`;