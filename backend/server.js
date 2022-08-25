import express from "express";
import data from "./data.js";
const app = express();

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id); /*ANTI GIA req.params.id and balo '2' epistrefei proion 2*/
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/", (req, res) => {
  res.send("Server is Ready");
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
