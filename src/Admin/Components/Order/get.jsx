import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link  } from "react-router-dom";

function OrderGet() {
  const [userData, setUserData] = useState([]);
 
 
  useEffect(() => {
    Axios.get("http://localhost/React_EcommerceA/src/Apis/adminOrder/Orderget.php")
      .then((response) => {
        console.log("Response", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

 

  

  return (
    <div className="users-data-r">
      <div className="user-data m-b-30 m-3">
        <div className="row justify-content-between mb-3">
          <div className="col-lg-6">
            <h3 className="title-3">
              <i className="zmdi zmdi-account-calendar"></i> Orders:
            </h3>
          </div>
          <div className="col">
            <p style={{ textAlign: "left", color: "#888" }}>
              Total number of Oders: {userData.length}
            </p>
          </div>
          
        </div>

        

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>user_id </th>
                <th>total_price</th>
                <th>order_status</th>
                <th>created_at</th>
                <th>deleted_at</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
           
                
                {userData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.user_id}</td>
                    <td>{item.total_price}</td>
                    <td>{item.order_status}</td>
                    <td>{item.created_at}</td>
                    <td>{item.deleted_at}</td>
                  
                  
                  <td>
                    <Link to={`/admin/Ordersdelete/delete/${item.id}`}>
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

export default OrderGet;
