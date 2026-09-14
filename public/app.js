// Grab the page elements by their ids (the "name tags" from the HTML).
const askButton = document.getElementById("askButton");
const billInput = document.getElementById("bill");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");

// When the Ask button is clicked, send the question to the backend and show the answer.
askButton.addEventListener("click", async () => {
  const billText = billInput.value;
  const question = questionInput.value;

  answerBox.textContent = "Thinking...";

  // The GraphQL query. $billText and $question are placeholders for the values.
  const query = `
    query AskBill($billText: String!, $question: String!) {
      askBill(billText: $billText, question: $question) {
        answer
      }
    }
  `;

  // Send the query to our backend's /graphql endpoint.
  const response = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { billText, question },
    }),
  });

  const result = await response.json();
  answerBox.textContent = result.data.askBill.answer;
});