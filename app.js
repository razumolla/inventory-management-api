const express = require("express");
const app = express();
const cors = require("cors");

// middlewares for
app.use(express.json());
app.use(cors());

// routes
const productRoute=require('./routes/product.route')
const brandRoute=require('./routes/brand.route')

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// posting data to database 
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);

module.exports = app;