import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS file
import 'bootstrap/dist/js/bootstrap.min.js'; // import Bootstrap JavaScript file
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import {
  Nav,
  Button,
  Form,
  Card,
  InputGroup,
  FormControl,
  FormGroup,
} from "react-bootstrap";


import { useState, useEffect } from "react";
//import { Container } from 'react-bootstrap';
function App() {
    const [product, setProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const [oneProduct, setOneProduct] = useState([]);
    const [viewer2, setViewer2] = useState(false);
    const [viewer4, setViewer4] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [index, setIndex] = useState(0);
    const [editedProduct, setEditedProduct] = useState({});
    
    // const [showAddModal, setShowAddModal] = useState(false);
    // const [showEditModal, setShowEditModal] = useState(false);

    // const handleCloseAddModal = () => setShowAddModal(false);
    // const handleShowAddModal = () => setShowAddModal(true);

    // const handleCloseEditModal = () => setShowEditModal(false);
    // const handleShowEditModal = () => setShowEditModal(true);

    // const [showAboutModal, setShowAboutModal] = useState(false);
    // const handleShowAboutModal = () => setShowAboutModal(true);
    // const handleCloseAboutModal = () => setShowAboutModal(false);



    // new Product
    const [addNewProduct, setAddNewProduct] = useState({
        _id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 },
    });

    function getAllProducts() {
        fetch("http://localhost:4000/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products :");
                console.log(data);
                setProduct(data);
            });
        setViewer1(!viewer1);
    }


    useEffect(() => {
        getAllProducts();
    }, []);

    
    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch("http://localhost:4000/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addNewProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Post a new product completed");
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });
    }

    

    function handleChange(evt) {
        const value = evt.target.value;
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

    function handleUpdateProduct(e) {
      e.preventDefault();
      fetch("http://localhost:4000/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Update product completed");
          console.log(data);
          if (data) {
            const value = Object.values(data);
            alert(value);
          }
        });
    }

    function getOneProduct(id) {
        console.log(id);
        if (id >= 1 && id <= 20) {
            fetch("http://localhost:4000/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    const dataArr = [];
                    dataArr.push(data);
                    setOneProduct(dataArr);
                });
            setViewer2(!viewer2);
        } else {
            console.log("Wrong number of Product id.");
        }
    }
    
    
    const showOneItem = oneProduct.map((el) => (
      <Container key={el._id} className="d-flex justify-content-center align-items-center">
        <div className="border p-3 d-flex justify-content-center align-items-center flex-column" style={{ backgroundColor: "lightgray" }}>
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
    
  
  const showAllItems = product.map((el) => (
    <div className="d-flex flex-wrap justify-content-center">
    {product.map((el) => (
      <div key={el._id} className="border p-3 m-3" style={{ backgroundColor: "lightgray" }}>
        <div className="d-flex flex-column align-items-center mb-3" style={{ backgroundColor: "lightgray" }}>
          <img className="img mb-2" src={el.image} width={200} height={200} />
          <Container>
            <div>
              Title: {el.title}
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
      </div>
    ))}
  </div>
  ));
  
    useEffect(() => {
        getAllProducts();
        }, [checked4]);

        function getOneByOneProductNext() {
            if (product.length > 0) {
            if (index === product.length - 1) setIndex(0);
            else setIndex(index + 1);
            if (product.length > 0) setViewer4(true);
            else setViewer4(false);
            }
            }
            function getOneByOneProductPrev() {
                if (product.length > 0) {
                if (index === 0) setIndex(product.length - 1);
                else setIndex(index - 1);
                if (product.length > 0) setViewer4(true);
                else setViewer4(false);
                }
                }
                function deleteOneProduct(deleteid) {
                    console.log("Product to delete :", deleteid);
                    fetch("http://localhost:4000/delete/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ _id: deleteid }),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                    console.log("Delete a product completed: ", deleteid);
                    console.log(data);
                    if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                    }
                    });
                    setChecked4(!checked4);
                    }
                    
                    return (
                      <div style={{textAlign: 'center'}}>
                        <Navbar bg="dark" variant="dark" className="d-flex justify-content-center mb-3">
                        <Navbar.Brand href="#home" style={{ fontSize: '24px' }}>Catalog of Dishes</Navbar.Brand>
                        </Navbar>
                        <button onClick={() => getAllProducts()} className="mb-3">Show All Dishes</button>
                        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
                    
                    <h1>Show One Dish By ID:</h1>
                        {viewer2 && <div>Dish: {showOneItem}</div>}
                        <hr></hr>
                        <div>
                        <h1>Show All Available Dishes.</h1>
                        <hr></hr>
                        {viewer1 && <div>Products {showAllItems}</div>}
                        <hr></hr>
                          <h3>Add a New Dish:</h3>
<form action="">
  <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} style={{ width: '10%', height: '30px' }} />
  <button type="submit" onClick={handleOnSubmit}>
    Add Dish
  </button>
</form>
                        </div>

  <div className="d-flex flex-column align-items-center">
  <h3 style={{ marginTop: '20px' }}>Delete One Dish:</h3>
  <div className="d-flex justify-content-center align-items-center">
    <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
      onChange={(e) => setChecked4(!checked4)} />
    <button className="btn btn-sm btn-secondary mx-1" onClick={() => getOneByOneProductPrev()}>Prev</button>
    <button className="btn btn-sm btn-secondary mx-1" onClick={() => getOneByOneProductNext()}>Next</button>
    <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
  </div>
  {checked4 && (
    <div style={{padding: '10px', display: 'inline-block', backgroundColor: "lightgray" }}>
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



<div>
      <h3 style={{ marginTop: '20px' }}>Edit an Existing Dish:</h3>
      <form key={editedProduct._id} onSubmit={handleUpdateProduct}>
        <input type="text" name="_id" placeholder="ID" value={editedProduct._id || ''} onChange={(e) => setEditedProduct({ ...editedProduct, _id: e.target.value })} style={{ width: '10%', height: '30px' }} />
        <input type="text" name="title" placeholder="Title" value={editedProduct.title || ''} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} style={{ width: '10%', height: '30px' }} />
        <input type="number" name="price" placeholder="Price" value={editedProduct.price || ''} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} style={{ width: '10%', height: '30px' }} />
        <input type="text" name="description" placeholder="Description" value={editedProduct.description || ''} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} style={{ width: '10%', height: '30px' }} />
        <input type="text" name="category" placeholder="Category" value={editedProduct.category || ''} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} style={{ width: '10%', height: '30px' }} />
        <input type="text" name="image" placeholder="Image URL" value={editedProduct.image || ''} onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })} style={{ width: '10%', height: '30px' }} />
        <input type="number" name="rate" placeholder="Rating" value={editedProduct.rating?.rate || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, rate: e.target.value } })} style={{ width: '10%', height: '30px' }} />
        <input type="number" name="count" placeholder="Number of ratings" value={editedProduct.rating?.count || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, count: e.target.value } })} style={{ width: '10%', height: '30px' }} />
        <button type="submit" onClick={handleUpdateProduct}>Update Dish</button>
      </form>
    </div>


<br></br>
    <div class="container bg-light rounded p-4 text-center">
    <h3>About Us</h3>
    <p>Osaid Samman: Sophomore in Computer Enginnering: oasamman@iastate.edu</p>
    <p>Devin Alamsya: Sophomore in Software Engineering: dalamsya@iastate.edu</p>
    <p>Group 36 for SE / ComS 319 with Professor Abraham Netzahualcoy Aldaco Gastelum. April 30th, 2023 (Spring 2023)</p>
    <p>Our project is a Catalog of Products. It's deployed on a website which uses CRUD operation. It was built using React, Nodejs and Express. Also used MongoDB for the data. Products can be gotten, added, updated, and deleted.</p>
  </div>


 {/* <div>
<h3 style={{ marginTop: '20px' }}>Edit an Existing Dish:</h3>
  <form key={editedProduct._id} onSubmit={handleUpdateProduct}>
    <input type="number" name="_id" placeholder="id?" value={editedProduct._id || ''} onChange={(e) => setEditedProduct({ ...editedProduct, _id: e.target.value })} style={{ width: '10%', height: '30px' }}/>
    <input type="text" name="title" placeholder="title?" value={editedProduct.title || ''} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} style={{ width: '10%', height: '30px' }}/>
    <input type="number" name="price" placeholder="price?" value={editedProduct.price || ''} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} style={{ width: '10%', height: '30px' }}/>
    <input type="text" name="description" placeholder="description?" value={editedProduct.description || ''} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} style={{ width: '10%', height: '30px' }}/>
    <input type="text" name="category" placeholder="category?" value={editedProduct.category || ''} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} style={{ width: '10%', height: '30px' }}/>
    <input type="text" name="image" placeholder="image?" value={editedProduct.image || ''} onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })} style={{ width: '10%', height: '30px' }}/>
    <input type="number" name="rate" placeholder="rate?" value={editedProduct.rating?.rate || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, rate: e.target.value } })} style={{ width: '10%', height: '30px' }}/>
    <input type="number" name="count" placeholder="count?" value={editedProduct.rating?.count || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, count: e.target.value } })} style={{ width: '10%', height: '30px' }}/>
    <button type="submit">Submit</button>
  </form>
</div>  */}

                      </div>
                    );
                    
} // App end
export default App;
