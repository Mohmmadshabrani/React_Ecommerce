import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SingleCategory/SingleCategory';
import MobileNavigation from './Navigation/MobileNavigation';
import DesktopNavigation from './Navigation/DesktopNavigation';
import Wishlist from './Pages/WhisList/Wishlist';
import PaymentSuccess from './Pages/Payment/PaymentSuccess';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutForm from './Components/Checkout/CheckoutForm';
import UpdateDetails from './Pages/Update_User/UpdateDetails';
import ForgotPasswordForm from './Auth/ForgotPassword/ForgotPasswordForm';
import AddNewPassword from './Auth/ForgotPassword/AddNewPassword';
import AdminLogin from './Admin/Auth/Login/AdminLogin';
import AdminRegister from './Admin/Auth/Register/AdminRegister';
import AdminHomePage from './Admin/Pages/AdminHomePage';
import SingleUserPage from './Admin/Pages/SingleUserPage';
import SingleProduct from './Admin/Pages/SingleProduct';
import Admin from './Admin/admincom/appadmin.jsx';
import Userview from './Admin/Components/userview';
import AdminUedit from './Admin/Components/adminUedit';
import AdminUD from './Admin/Components/adminUD';
import Footer from "./Footer/Footer";
import AboutUs from "./About/About";
import ContactUs from "./Contact/Contact";



function App() {
  return (
    <>
      <ToastContainer
        toastClassName="toastContainerBox"
        transition={Flip}
        position="top-center"
      />
      <Router>
        <DesktopNavigation />
        <div className="margin">
          <Routes>
            {/*User Routes  */}
            <Route path="/" index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Detail/:id/:name" element={<ProductDetail />} />
            <Route path="product/:id/:name" element={<SingleCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/update" element={<UpdateDetails />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route path="/user/reset/:id/:token" element={<AddNewPassword />} />
            <Route path="/About"  element={<AboutUs />}/>
            <Route path="/Contact"  element={<ContactUs />}/>
            {/* Admin Routes */}
            <Route path="/admin/login" element={< AdminLogin />} />
            <Route path='/admin/register' element={<AdminRegister />} />
            <Route path='/admin/home' element={<AdminHomePage />} />
            <Route path='/admin/home/user/:id' element={<SingleUserPage />} />
            <Route path='/admin/home/product/:type/:id' element={<SingleProduct />} />

            <Route path="/admin/new" element={< Admin />} />
            <Route path="/admin/userview" element={< Userview />} />
            <Route path="/admin/useredit/edit/:id" element={< AdminUedit />} />
            <Route path="/admin/userdelete/delete/:id" element={< AdminUD />} />
            
          </Routes>
        </div>
        <Footer />
        <MobileNavigation />
      </Router>
    </>
  );
}
export default App;
