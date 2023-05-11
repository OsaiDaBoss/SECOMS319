// Importing required packages
const express = require("express"); // For creating server and handling HTTP requests
const mongoose = require("mongoose"); // For interacting with MongoDB database
const cors = require("cors"); // For enabling Cross-Origin Resource Sharing
const Product = require("./dataSchema.js"); // Importing Mongoose schema for "Product" collection

// Creating an instance of express application
const app = express();

// Adding middleware to handle JSON data in requests
app.use(express.json());

// Adding middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Adding middleware to serve static files from "public" folder
app.use(express.static("public"));

// Adding middleware to serve static files from "images" folder using "/images" route
app.use("/images", express.static("images"));

// Connecting to the "reactdata" MongoDB database running on the local machine at port 27017
mongoose.connect("mongodb://127.0.0.1:27017/reactdata",
{
dbName: "reactdata", // Name of the database to connect to
useNewUrlParser: true, // Allowing Mongoose to use new URL parser
useUnifiedTopology: true, // Allowing Mongoose to use new server discovery and monitoring engine
}
);

// Setting up the port for the server to listen on
const port = process.env.PORT || 4000; // Using the port defined in the environment variable or port 4000 by default

// Setting up the host for the server to listen on
const host = "localhost"; // Using the host name "localhost" as the default host

// Adding a route to handle GET requests for the root URL "/"
app.get("/", async (req, resp) => {
  const query = {}; // Creating an empty query to retrieve all products
  const allProducts = await Product.find(query); // Retrieving all products from the "Product" collection using Mongoose's "find" method
  console.log(allProducts); // Logging the retrieved products to the console
  resp.send(allProducts); // Sending the retrieved products as the response to the client
  });


// Adding a route to handle POST requests to "/insert"
app.post("/insert", async (req, res) => {
  console.log(req.body); // Logging the request body to the console

  // Extracting product information from the request body
  const p_id = req.body._id;
  const ptitle = req.body.title;
  const pprice = req.body.price;
  const pdescription = req.body.description;
  const pcategory = req.body.category;
  const pimage = req.body.image;
  const prate = req.body.rating.rate;
  const pcount = req.body.rating.count;
  
  // Creating a new Product instance with the extracted information
  const formData = new Product({
      _id: p_id,
      title: ptitle,
      price: pprice,
      description: pdescription,
      category: pcategory,
      image: pimage,
      rating: { rate: prate, count: pcount },
  });
  
  try {
      // Saving the new product to the "Product" collection using Mongoose's "create" method
      await Product.create(formData);
  
      // Sending a success message as the response
      const messageResponse = { message: `Product ${p_id} added correctly` };
      res.send(JSON.stringify(messageResponse));
  } catch (err) {
      // Handling errors if any occur while saving the product
      console.log("Error while adding a new product:" + err);
  };
});

// Starting the server to listen for requests on the defined "port" and "host"
app.listen(port, () => {
  console.log('App listening at http://%s:%s', host, port);
  });
  
  // Adding a route to handle GET requests for a specific product with an ID parameter
  app.get("/:id", async (req, resp) => {
  const id = req.params.id; // Extracting the ID parameter from the request URL
  const query = { _id: id }; // Creating a query object to retrieve a product with the extracted ID
  const oneProduct = await Product.findOne(query); // Retrieving a product with the given ID from the "Product" collection using Mongoose's "findOne" method
  console.log(oneProduct); // Logging the retrieved product to the console
  resp.send(oneProduct); // Sending the retrieved product as the response to the client
  });

  
// Adding a route to handle PUT requests to "/update"
app.put("/update", async (req, res) => {
  try {
      const updatedProduct = req.body; // Extracting the updated product object from the request body
      const query = { _id: updatedProduct._id }; // Creating a query object to retrieve a product with the ID of the updated product
      await Product.findOneAndUpdate(query, updatedProduct, { new: true }); // Updating the product with the given ID using Mongoose's "findOneAndUpdate" method and passing the updated product object as the second argument
      const messageResponse = {
          message: `Product ${updatedProduct._id} updated correctly`,
      };
      res.send(JSON.stringify(messageResponse)); // Sending a success message as the response
  } catch (err) {
      console.log("Error while updating product: " + err); // Handling errors if any occur while updating the product
  }
});
  

// Adding a route to handle DELETE requests to "/delete"
app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body); // Logging the ID of the product to be deleted
  try {
      const query = { _id: req.body._id }; // Creating a query object to retrieve a product with the ID of the product to be deleted
      await Product.deleteOne(query); // Deleting the product with the given ID using Mongoose's "deleteOne" method
      const messageResponse = {
          message: `Product ${req.body._id} deleted correctly`,
      };
      res.send(JSON.stringify(messageResponse)); // Sending a success message as the response
  } catch (err) {
      console.log("Error while deleting:" + p_id + " " + err); // Handling errors if any occur while deleting the product
  }
});