// Importing necessary dependencies from react-bootstrap and react libraries
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 
import { Container, Button, Nav, Card, } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react";

// Initializing various states required for the App
function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [viewer3, setViewer3] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [editedProduct, setEditedProduct] = useState({});

  // Initializing the image URLs
  const osaidImage = "http://127.0.0.1:4000/images/Osaid.jpg";
  const devinImage = "http://127.0.0.1:4000/images/Devin.jpeg";

  // Initializing the state for adding a new product
  const [addNewProduct, setAddNewProduct] = useState({
    _id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: "", count: ""},
  });


  // What view 2 looks like.
  const View2 = () => {
    return (
      <div>
        <h3>Add a New Dish:</h3>
        <form action="" class="needs-validation">
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="ID of Dish" name="_id" value={addNewProduct._id} onChange={handleChange} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Name of Dish" name="title" value={addNewProduct.title} onChange={handleChange} required></input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="Price of Dish" name="price" value={addNewProduct.price} onChange={handleChange} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Description of Dish" name="description" value={addNewProduct.description} onChange={handleChange} required></input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Type of Dish" name="category" value={addNewProduct.category} onChange={handleChange} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Image of Dish" name="image" value={addNewProduct.image} onChange={handleChange} required></input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="Rating of Dish" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="Count of Dish" name="count" value={addNewProduct.rating.count} onChange={handleChange} required></input>
            </div>
          </div>
          <button class="btn btn-primary" onClick={handleOnSubmit}>Add Dish</button>
        </form>

        <hr></hr>

        <h3 style={{ marginTop: '20px' }}>Edit an Existing Dish:</h3>
        <form key={editedProduct._id} onSubmit={handleUpdateProduct} class="needs-validation">
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="ID of Dish" name="_id" value={editedProduct._id || ''} onChange={(e) => setEditedProduct({ ...editedProduct, _id: e.target.value })} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Name of Dish" name="title" value={editedProduct.title || ''} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} required></input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="Price of Dish" name="price" value={editedProduct.price || ''} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Description of Dish" name="description" value={editedProduct.description || ''} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} required></input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Category of Dish" name="category" value={editedProduct.category || ''} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" class="form-control" placeholder="Image of Dish" name="image" value={editedProduct.image || ''} onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })} required></input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="Rating of Dish" name="rate" value={editedProduct.rating?.rate || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, rate: e.target.value } })} required></input>
            </div>
            <div class="col-md-6 mb-3">
              <input type="number" class="form-control" placeholder="Count of Dish" name="count" value={editedProduct.rating?.count || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, count: e.target.value } })} required></input>
            </div>
          </div>
          <button class="btn btn-primary" type="submit" onClick={handleUpdateProduct} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff' }}>Update Dish</button>
        </form>

        <hr></hr>

        <div className="d-flex flex-column align-items-center">
          <h3 style={{ marginTop: '20px' }}>Delete a Dish:</h3>
          <div className="d-flex justify-content-center align-items-center">
            <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
              onChange={(e) => setChecked4(!checked4)} />
            <button className="btn btn-sm btn-secondary mx-1" onClick={() => getOneByOneProductPrev()}>Prev</button>
            <button className="btn btn-sm btn-secondary mx-1" onClick={() => getOneByOneProductNext()}>Next</button>
            <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
          </div>
          {checked4 && (
            <div style={{ padding: '10px', display: 'inline-block', backgroundColor: "white" }}>
              <img src={product[index].image} width={200} />
              <div>
                ID: {product[index]._id} <br />
                Title: {product[index].title} <br />
                {product[index].description} <br />
                Category: {product[index].category} <br />
                Price: {product[index].price} <br />
                Rate: {product[index].rating.rate} <br />
                Count: {product[index].rating.count} <br />
              </div>
            </div>
          )}
        </div>
      </div>

    );
  };

  //What view 3 looks like.
  const View3 = () => {
    return (
      <>
        <br />
        <div className="container bg-light rounded p-4 text-center">
          <h3>About Us</h3>
          <div className="row">
            <div className="col">
              <img src={osaidImage} alt="Osaid" width="200" />
              <p>Osaid Samman: <br></br>Sophomore in Computer Enginnering: <br></br>oasamman@iastate.edu</p>
            </div>
            <div className="col">
              <img src={devinImage} alt="Devin" width="200" />
              <p>Devin Alamsya: <br></br>Sophomore in Software Engineering: <br></br>dalamsya@iastate.edu</p>
            </div>
          </div>
          <p>
            Group 36 for SE / ComS 319 with Professor Abraham Netzahualcoy Aldaco Gastelum. April 30th, 2023 (Spring 2023)
          </p>
        </div>
      </>
    );
  };


// This function makes a GET request to the server to fetch all products data
function getAllProducts() {
  // Fetch data from server at specified URL using GET method
  fetch("http://localhost:4000/")
    // Parse the response data into JSON format
    .then((response) => response.json())
    // Update the state variable 'product' with fetched data
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setProduct(data);
    });
  // Toggle the state variable 'viewer1' to render the catalog of products
  setViewer1(!viewer1);
}

// This is a React hook that runs after the component renders
// It will call the `getAllProducts` function once, thanks to the empty array passed as the second argument
// This is equivalent to componentDidMount() in class components
// It is used to fetch all the products when the component mounts for the first time
  useEffect(() => {
    getAllProducts();
  }, []);


  function handleOnSubmit(e) {
    // Prevents the default behavior of the form submit
    e.preventDefault();
    console.log(e.target.value);
    // Sends a POST request to the server to insert a new product
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Sets the request body to a JSON representation of the new product
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // Logs the response from the server
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          // If there is a message in the response, show it as an alert
          const value = Object.values(data);
          alert(value);
        }
      });
  }
  

  function handleChange(evt) {
    // Get the value from the input field
    const value = evt.target.value;

    // Set the new state for the corresponding property of addNewProduct object based on the input field's name  
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

// A function to handle the submission of a product update
function handleUpdateProduct(e) {
  e.preventDefault(); // Prevents the default form submission behavior
  fetch("http://localhost:4000/update", { // Sends a PUT request to the server at localhost:4000/update
    method: "PUT", // Specifies that the request is a PUT request
    headers: { "Content-Type": "application/json" }, // Sets the request header to indicate that the content type is JSON
    body: JSON.stringify(editedProduct), // Sets the request body to the edited product in JSON format
  })
    .then((response) => response.json()) // Converts the server's response to JSON
    .then((data) => {
      console.log("Update product completed"); // Logs that the update has been completed
      console.log(data); // Logs the data returned from the server
      if (data) {
        const value = Object.values(data);
        alert(value); // Displays an alert with the returned data
      }
    });
}


// This function fetches data for a single product by its id
function getOneProduct(id) {
  console.log(id);
  // If the id is within the valid range of 1 to 20, then fetch the data for that product
  if (id >= 1 && id <= 20) {
    fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        // Log the data for the single product to the console
        console.log("Show one product :", id);
        console.log(data);
        // Create an array with the single product's data and set the state of oneProduct to that array
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
    // Set the viewer2 state to true
    setViewer2(!viewer2);
  } else {
    // If the id is not within the valid range of 1 to 20, log an error message to the console
    console.log("Wrong number of Product id.");
  }
}


  const showOneItem = oneProduct.map((el) => (
    <Container key={el._id} className="d-flex justify-content-center align-items-center">
      <div className="border p-3 d-flex justify-content-center align-items-center flex-column" style={{ backgroundColor: '#f2f2f2' }}>
        <img className="img mb-2" src={el.image} width={200} height={200} />
        <Container>
          <div>
            Title: {el.title}
          </div>
          <div>
            {el.description}
          </div>
          <div>
            Category: {el.category}
          </div>
          <div>
            Price: {el.price}
          </div>
          <div>
            Rate: {el.rating.rate}
          </div>
          <div>
            Count: {el.rating.count}
          </div>
        </Container>
      </div>
    </Container>
  ));

  const showAllItems = (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
      {product.map((el) => (
        <Card style={{ width: '18rem', margin: '10px', display: 'flex', flexDirection: 'column' }}>
          <Card.Img variant="top" src={el.image} style={{ width: '150px', height: '150px', margin: '0 auto', justifyContent: 'center', alignItems: 'center' }} />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Text>
              <div key={el._id}>
                <div style={{ textAlign: 'center' }}>
                  Title: {el.title}
                </div>
                <br />
                Category: {el.category}
                <br />
                Price: {el.price}
                <br />
                Rate: {el.rating.rate}
                <br />
                Count: {el.rating.count}
                <br />
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  useEffect(() => {
    getAllProducts();
  }, [checked4]);


  // This function moves to the next product in the list one by one
  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  // This function moves to the previous product in the list one by one
  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

// This function deletes a single product from the database using its id
function deleteOneProduct(deleteid) {
  console.log("Product to delete :", deleteid);
  // Sends a DELETE request to the backend server to delete the product with the given id
  fetch("http://localhost:4000/delete/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: deleteid }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Delete a product completed: ", deleteid);
      console.log(data);
      // If the delete operation was successful, display an alert with the result
      if (data) {
        const value = Object.values(data);
        alert(value);
      }
    });
  // Trigger the getAllProducts function to refresh the list of products
  setChecked4(!checked4);
}

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-center justify-content-around mb-3">
          <Button variant="secondary" className="mr-2" onClick={() => { setViewer1(true); setViewer2(false); setViewer3(false); getAllProducts(); }}>Menu</Button>
          <Button variant="secondary" className="mr-2" onClick={() => { setViewer1(false); setViewer2(true); setViewer3(false); }}>DevMode</Button>
          <Button variant="secondary" onClick={() => { setViewer1(false); setViewer2(false); setViewer3(true); }}>Contact</Button>
        </Navbar>
        <div>
          <hr />
          <img src="http://127.0.0.1:4000/images/logo.png" alt="logo" />
          <p><br />This is our restaurant that sells both Middle Eastern cuisine and Indonesian cuisine.<br />Salam in Arabic means peace and in Indonesian means greetings.<br />We hope you find something that you enjoy!</p>
          <hr />
          {viewer1 && <div> Search {showOneItem} <div><button onClick={() => getAllProducts()} className="mb-3">Show All Dishes</button>
            <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} /></div></div>}
          {viewer1 && <div>Menu {showAllItems}</div>}
        </div>
        {viewer2 && <View2 />}
        {viewer3 && <View3 />}
      </div>
    </>
  );

} // App end
export default App;
