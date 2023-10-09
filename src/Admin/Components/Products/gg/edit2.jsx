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
        axios.post(`http://localhost/React_EcommerceA/src/Apis/adminCategory/categoryedit.php?id=${id}`, formData)
          .then((response) => {
            console.log('File uploaded:', response.data);
            navigate('/admin/Categoryview');
          });
      } else {
        console.log('No file selected.');
      }
    };
    
    
    

   
   
  
return (
    <div id="editPmaindiv">
        <form id="form" onSubmit={submit}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Category Name </th>
                    <th>Category image</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><label>Category Name:</label>
                        <input         
                            type='text'
                            value={inputValue}
                            onChange={onInputChange}/></td>
                        <td>
                        <label>Category image</label>
                        <input type="file" name="photo" onChange={onFileChange} />
                        </td>
                     
                      
                        <td>
                        <input type="submit" value='add' onClick={onFileUpload}/>
                        </td>
                    </tr>
              
                </tbody>
            </table>
        </form>
    </div>
    
                
             

);
// ...

}

export default Edit ;
