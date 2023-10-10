import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductsGet() {
  const [selectedFile, setSelectedFile] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputdes, des] = useState('');
    const [inputpri, pri] = useState('');
    const [inputcata, scata] = useState('');
    const [inputqun, qun] = useState('');
    // const [inputsales, sales] = useState('');
    const [data, setData] = useState([]);
   

    const onFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    
    const onInputChange = (event) => {
        setInputValue(event.target.value);
      };
    const ondesChange = (event) => {
        des(event.target.value);
      };
    const onpriChange = (event) => {
        pri(event.target.value);
      };

    const onqunChange = (event) => {
        qun(event.target.value);
      };

    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [ProductsData, setProductsData] = useState([]);
    const [categorydata, setcategoryData] = useState([]);
    const [categoriesSSSData, setCategoriesSSSData] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const toggleAddForm = () => {
      setShowAddForm(!showAddForm);
    };

    useEffect(() => {
      axios
        .get(
          "http://localhost/React_EcommerceA/src/Apis/adminCategory/categoryget.php"
        )
        .then((response) => {
          setCategoriesSSSData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost/React_EcommerceA/src/Apis/adminProducts/Productget.php")
          .then((response) => {
            setData(response.data);
            setProductsData(response.data);
            
            
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
    const onFileUpload = (e) => {
        e.preventDefault();
      if (selectedFile) {
        
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('name', inputValue);
        formData.append('category_id', inputcata);
        formData.append('price', inputpri);
        formData.append('discount', inputqun);
        formData.append('description', inputdes);
        // formData.append('sales', inputsales);
        console.log(inputcata);
        axios.post('http://localhost/React_EcommerceA//src/Apis/adminProducts/Productadd.php', formData)
          .then((response) => {
            console.log('File uploaded:', response.data);
            // window.location.reload();
          });
      } else {
        console.log('No file selected.');
      }
    };

  return (
    <div className="users-data-r">
      <div className="user-data m-b-30 m-3">
        <div className="row justify-content-between mb-3">
          <div className="col-lg-6">
            <h3 className="title-3">
              <i className="zmdi zmdi-account-calendar"></i> Products:
            </h3>
          </div>
          <div className="col">
            <p style={{ textAlign: "left", color: "#888" }}>
              Total number of Products: {ProductsData.length}
            </p>
          </div>
          <div className="col mb-4">
            <button className="btn btn-success add-new" onClick={toggleAddForm}>
              Add New User
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="add-user-form">
            <h4>Add New Product</h4>
            <div id="adddiv">
              <form className="admins category">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Products Image</th>
                      <th>Products Name </th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                      <input type="file" name="image" onChange={onFileChange} />

                      </td>
                      <td>
                      <input         
                      type='text'
                      name="name"
                      value={inputValue.name}
                      onChange={onInputChange}/>
                      </td>

                      <td>
                      <input         
                      type='number'
                      name="price"
                      value={inputValue.price}
                      onChange={onpriChange}/>
                      </td>
                      <td>
                      <input         
                          type='number'
                          name="discount"
                          value={inputValue.discount}
                          onChange={onqunChange}/>
                      </td>
                      <td>
                      <input         
                      type='text'
                      name="description"
                      value={inputValue.description}
                      onChange={ondesChange}/>
                      </td>

                      <td>
                      <select
                          className="form-select"
                          name="category_id"
                          value={selectedCategoryId}
                          onChange={(e) =>
                            scata(e.target.value)
                          }
                        >
                          <option value="">Select a category</option>
                          {categoriesSSSData.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <input
                          type="submit"
                          value="add"
                          onClick={onFileUpload}
                          className="btn btn-success add-new"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        )}
        <br />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Products Name </th>
                <th>category Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Description</th>
                <th>Products Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={`${item.mainPicture}`}
                      alt="mainPicture"
                      style={{ width: "200px", height: "200px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category_id}</td>
                  <td>{item.price}</td>
                  <td>{item.discount}</td>
                  <td>{item.description}</td>
                  

                  
                  <td>
                    <Link to={`/admin/Productsedit/edit/${item.id}`}>
                      <button className="btn btn-outline-primary" type="button">
                        <i className="fa fa-plus"></i>Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/Productsdelete/delete/${item.id}`}>
                      <button className="btn btn-outline-danger" type="button">
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsGet;
