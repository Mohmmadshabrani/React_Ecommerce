import React, { useState } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { useParams, useNavigate } from 'react-router-dom';


function EditUserForm({  firstName, lastName, email, phoneNumber, password,display }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
   
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

    Axios.post(`http://localhost:8000/src/Apis/adminUsers/useredit.php?id=${id}`, formData)
      .then((response) => {
        console.log('User updated successfully:', response.data);
        navigate('/admin/userview');
        
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div id="editdiv" style={{ display }} className='m-5'>
            
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={formData.userid} name="userid" />
        <label className="col-2">First Name:</label>
        <input
          className="col-5"
          type="text"
          value={formData.firstName}
          name="firstName"
          onChange={handleInputChange}
        /><br />
        <label className="col-2">Last Name:</label>
        <input
          className="col-5"
          type="text"
          value={formData.lastName}
          name="lastName"
          onChange={handleInputChange}
        /><br />
        <label className="col-2">Email:</label>
        <input
          className="col-5"
          type="text"
          value={formData.email}
          name="email"
          onChange={handleInputChange}
        /><br />
        <label className="col-2">Mobile:</label>
        <input
          className="col-5"
          type="text"
          value={formData.phoneNumber}
          name="phoneNumber"
          onChange={handleInputChange}
        /><br />
        <label className="col-2">Password:</label>
        <input
          className="col-5"
          type="text"
          value={formData.password}
          
          name="password"
          onChange={handleInputChange}
        /><br />
        <input
          type="submit"
          className="btn btn-outline-secondary"
          value="Save"
          name="newuser"
        />
      </form>
    </div>
    
  );
}

export default EditUserForm;