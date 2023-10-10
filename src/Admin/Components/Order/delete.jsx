import React, { useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CategoryDelete() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `http://localhost/React_EcommerceA/src/Apis/adminOrder/Orderdelete.php?id=${id}`;

        axios.delete(url)
            .then(response => {
                console.log("User deleted:", response.data);


                navigate('/admin/Ordersview');
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [id, navigate]);

    return (
        <div>
         Order is deleted ...
        </div>
    );
}

export default CategoryDelete;
