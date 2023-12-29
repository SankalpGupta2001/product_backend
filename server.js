const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const productController = require("./controllers/ProductControllers");

app.use("/app",productController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});