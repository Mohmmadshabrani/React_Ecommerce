import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function CategoryGet() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [categoriesData, setcategoriesData] = useState([]);
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/src/Apis/adminCategory/categoryget.php"
      )
      .then((response) => {
        setData(response.data);
        setcategoriesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onFileUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("text", inputValue);
      axios
        .post(
          "http://localhost:8000/src/Apis/adminCategory/categoryadd.php",
          formData
        )
        .then((response) => {
          console.log("File uploaded:", response.data);

          window.location.reload();
        });
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="users-data-r">
      <div className="user-data m-b-30 m-3">
        <div className="row justify-content-between mb-3">
          <div className="col-lg-6">
            <h3 className="title-3">
              <i className="zmdi zmdi-account-calendar"></i> Categories:
            </h3>
          </div>
          <div className="col">
            <p style={{ textAlign: "left", color: "#888" }}>
              Total number of categories: {categoriesData.length}
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
            <h4>Add New Category</h4>
            <div id="adddiv">
              <form className="admins category">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Category Name </th>
                      <th>Category Image</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={onInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          name="photo"
                          onChange={onFileChange}
                        />
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
                <th>Category Name </th>

                <th>Category Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>

                  <td>
                    <img
                      src={`/img/${item.image}`}
                      alt="category_image"
                      style={{ width: "200px", height: "200px" }}
                    />
                  </td>
                  <td>
                    <Link to={`/admin/Categoryedit/edit/${item.id}`}>
                      <button className="btn btn-outline-primary" type="button">
                        <i className="fa fa-plus"></i>Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/Categorydelete/delete/${item.id}`}>
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

export default CategoryGet;
