import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FaPlus } from "react-icons/fa";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


function Edit() {
    const {id} = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const onFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const onInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const onFileUpload = (e) => {
        e.preventDefault();
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('text', inputValue);
        axios.post(`http://localhost:8000/src/Apis/adminCategory/categoryedit.php?id=${id}`, formData)
          .then((response) => {
            console.log('File uploaded:', response.data);
            navigate('/admin/Categoryview');
          });
      } else {
        console.log('No file selected.');
      }
    };
    
    
    

   
   
  
return (
  <div className="add-user-form">
  <h4>Edit Category</h4>
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
              <input type='text' value={inputValue} onChange={onInputChange}/>
              </td>
              <td>
              <input type="file" name="photo" onChange={onFileChange} />
              </td>
              <td>
              <input type="submit" value='add' onClick={onFileUpload} className="btn btn-success add-new"/>
              </td>
            </tr>
        </tbody>
      </table>
    </form>
  </div>
</div>

);


}

export default Edit ;
