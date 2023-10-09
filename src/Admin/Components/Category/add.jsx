import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FaPlus } from "react-icons/fa";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';





function Add() {

    const navigate = useNavigate();

    const [inputs , setInputs ] = useState({});

    const changed = (e) => {
        const name = e.target.name;
        const fileInput = e.target;
    
        if (name === "photo") {
            // Extract just the filename from the full path
            const fileName = fileInput.value.split("\\").pop();
            // Add the path before the filename
            const filePath = "/img/" + fileName;
    
            // Create a new object to update the state
            const updatedInputs = { ...inputs, [name]: filePath };
            setInputs(updatedInputs);
        } else {
            // For other input fields, directly set the value in the state
            setInputs((values) => ({ ...values, [name]: e.target.value }));
        }
    };
    
    
    
    const submitData = (e) =>{
        e.preventDefault();

        console.log("Form Data:", inputs);

        const url = 'http://localhost:8000/src/Apis/adminCategory/categoryadd.php';

        axios.post(url , inputs)


            .then(response => {
                console.log("Response from PHP:", response.data);

                navigate('/admin/Categoryview');

                console.log(inputs)
            })
            .catch(error => {
                console.error("Error:", error);
            });

            // console.log("Request Data:", inputs);

    }
    
    return (
        <div id="editPmaindiv">
        <form id="form" onSubmit={submitData}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th>Name </th>
                    <th>Photo</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><input type="text" required name="name" onChange={changed} /></td>
                        <td><input type="file" required name="photo" onChange={changed} /></td>
                        <td>
                            <button type="submit" className="btn btn-info add-new">Add</button>
                        </td>
                    </tr>
                 
                </tbody>
            </table>
        </form>
    </div>
    );
}

export default Add ;
