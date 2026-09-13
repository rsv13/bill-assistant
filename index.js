import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
    res.send("Bill Assistant server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

