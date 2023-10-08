import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate , Link  } from "react-router-dom";

function Users() {
  const [userData, setUserData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate(); 
 
  useEffect(() => {
    Axios.get("http://localhost/React_EcommerceA/src/Apis/adminUsers/usersget.php")
      .then((response) => {
        console.log("Response", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // toggle form
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  //ADD NEW USER TO DATABASE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Axios.post("http://localhost/React_EcommerceA/src/Apis/registerUser.php", formData)
      .then((response) => {
        console.log("User added successfully:", response.data);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
        });
        navigate('/admin/userview');
        

      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="users-data-r">
      <div className="user-data m-b-30 m-3">
        <div className="row justify-content-between mb-3">
          <div className="col-lg-6">
            <h3 className="title-3">
              <i className="zmdi zmdi-account-calendar"></i> Users:
            </h3>
          </div>
          <div className="col">
            <p style={{ textAlign: "left", color: "#888" }}>
              Total number of users: {userData.length}
            </p>
          </div>
          <div className="col mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={toggleAddForm}
            >
              Add New User
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="add-user-form">
            <h4>Add New User</h4>
            <div id="adddiv">
              <form onSubmit={handleSubmit}>
                <label className="col-2">First Name:</label>
                <input
                  className="col-5"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="col-2">Last Name:</label>
                <input
                  className="col-5"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="col-2">Email:</label>
                <input
                  className="col-5"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="col-2">Mobile:</label>
                <input
                  className="col-5"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="col-2">Password:</label>
                <input
                  className="col-5"
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <br />
               
                <input
                  type="submit"
                  className="btn btn-outline-secondary"
                  value="Add"
                  name="addnewuser"
                />
              </form>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                // <tr><img src=""></img></tr>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  
                  <td>
                    <Link to={`/admin/useredit/edit/${user.id}`}>
                    
                      <button className="btn btn-outline-primary">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/userdelete/delete/${user.id}`}>
                      <button className="btn btn-outline-danger">Delete</button>
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

export default Users;
