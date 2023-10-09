import Admin from "../main";
import { useParams, useNavigate } from 'react-router-dom';
import { useState  , useEffect} from "react";
import axios from 'axios';
import '../admins/admins.css';
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
        axios.get("http://localhost/React_project/back-end/category-admin/read.php")
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
        formData.append('category', inputcata);
        formData.append('quantity', inputqun);
        formData.append('sales', inputsales);
        console.log(inputValue);
        axios.post(`http://localhost/React_project/back-end/products-admin/edit.php?id=${id}`, formData)
          .then((response) => {
            console.log('File uploaded:', response.data);
            navigate('/admin/products')
          });
      } else {
        console.log('No file selected.');
      }
    };
    return(
        <>
            <Admin />
            <div className="content">
            <form className=" category" id="admins" onSubmit={onFileUpload}>
                <label>Product Name</label>
                <input         
                    type='text'
                    name="name"
                    value={inputValue.name}
                    onChange={onInputChange}/>
                <label>Description</label>
                <input         
                    type='text'
                    name="description"
                    value={inputValue.description}
                    onChange={ondesChange}/>
                <label>Price</label>
                <input         
                    type='number'
                    name="price"
                    value={inputValue.price}
                    onChange={onpriChange}/>
                <label>Category Name</label>
                <select
                        className="admin_select"
                        name="category"
                        onChange={oncataChange}
                        value={inputValue.category}
                        >
                            <option selected>Category Name</option>
                        {data.map((e)=>(
                            <option value={e.CategoryID}>{e.CategoryName}</option>
                        ))}
                    </select>
                <label>stockQuantity</label>
                <input         
                    type='number'
                    name="quantity"
                    value={inputValue.quantity}
                    onChange={onqunChange}/>
                <label>sales</label>
                <input         
                    type='number'
                    name="sales"
                    value={inputValue.sales}
                    onChange={onsalesChange}/>
                <label>Product image</label>
                <input type="file" name="photo" onChange={onFileChange} />
                <input type="submit" value='add' />
                </form>
            </div>
            
        </>
    )
}
export default EditProduct;