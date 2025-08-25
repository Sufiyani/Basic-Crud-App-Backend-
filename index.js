const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ProductRoute = require("./routes/product-route.js");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", ProductRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(
    'mongodb://localhost:27017/CrudApp'
  )
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });