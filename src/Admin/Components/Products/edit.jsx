
import { useParams, useNavigate } from 'react-router-dom';
import { useState  , useEffect} from "react";
import axios from 'axios';
function EditProduct(){
  
  const {id} = useParams();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputdes, des] = useState('');
    const [inputpri, pri] = useState('');
    const [inputcata, scata] = useState('');
    const [inputqun, qun] = useState('');
    const [inputsales, sales] = useState('');
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
      const oncataChange = (event) => {
          scata(event.target.value);
        };
      const onqunChange = (event) => {
          qun(event.target.value);
        };
      const onsalesChange = (event) => {
          sales(event.target.value);
        };
    useEffect(() => {
        axios.get("http://localhost:8000/src/Apis/adminProducts/Productget.php")
          .then((response) => {
            setData(response.data);
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
        formData.append('description', inputdes);
        formData.append('price', inputpri);
        formData.append('category_id', inputcata);
        formData.append('discount', inputqun);
        formData.append('sales', inputsales);
        console.log(inputValue);
        axios.post(`http://localhost:8000/src/Apis/adminProducts/Productedit.php?id=${id}`, formData)
          .then((response) => {
            console.log('File uploaded:', response.data);
            navigate('/admin/products')
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
          <th>Products Image</th>
          <th>Products Name </th>
          <th>Price</th>
          <th>Discount</th>
          <th>Description</th>
          <th>Category </th>
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
            value={inputValue.sales}
            onChange={onsalesChange}/>
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
          className="admin_select"
          name="category_id"
          onChange={oncataChange}
          value={inputValue.category}
          >
              <option selected>Category Name</option>
          {data.map((e)=>(
              <option value={e.category_id}>{e.name}</option>
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

);


}

export default EditProduct ;
