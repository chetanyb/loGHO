import { Express } from "express";

const app = new Express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
