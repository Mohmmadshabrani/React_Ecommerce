import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/Detail/ProductDetail";
import SingleCategory from "./SingleCategory/SingleCategory";
import MobileNavigation from "./Navigation/MobileNavigation";
import DesktopNavigation from "./Navigation/DesktopNavigation";
import Wishlist from "./Pages/WhisList/Wishlist";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "./Components/Checkout/CheckoutForm";
import UpdateDetails from "./Pages/Update_User/UpdateDetails";
import ForgotPasswordForm from "./Auth/ForgotPassword/ForgotPasswordForm";
import AddNewPassword from "./Auth/ForgotPassword/AddNewPassword";
import AdminLogin from "./Admin/Auth/Login/AdminLogin";
import AdminRegister from "./Admin/Auth/Register/AdminRegister";
import AdminHomePage from "./Admin/Pages/AdminHomePage";
import SingleUserPage from "./Admin/Pages/SingleUserPage";
import SingleProduct from "./Admin/Pages/SingleProduct";
import Admin from "./Admin/admincom/appadmin.jsx";
import Userview from "./Admin/Components/userview";
import AdminUedit from "./Admin/Components/adminUedit";
import AdminUD from "./Admin/Components/adminUD";
import Footer from "./Footer/Footer";
import Categoryview from "./Admin/Components/Category/categoryview";
import CategoryEdit from "./Admin/Components/Category/categoryedit";
import Categoryadd from "./Admin/Components/Category/categoryadd";
import Categorydelete from "./Admin/Components/Category/categorydelete";
import Productsview from "./Admin/Components/Products/Productsview";
import ProductsEdit from "./Admin/Components/Products/Productsedit";
import Productsdelete from "./Admin/Components/Products/Productsdelete";
import Ordersview from "./Admin/Components/Order/Orderview";
import Ordersdelete from "./Admin/Components/Order/Orderdelete.jsx";

import AboutUs from "./About/About";
import ContactUs from "./Contact/Contact";
import { useEffect, useState } from "react";

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    let st = window.location.pathname.startsWith("/ADMIN") || window.location.pathname.startsWith("/admin")
    setIsAdminRoute(st);
  }, []);
  return (
    <>
      <ToastContainer
        toastClassName="toastContainerBox"
        transition={Flip}
        position="top-center"
      />
      <Router>
        {!isAdminRoute && <DesktopNavigation />}
        <div className={isAdminRoute ? '' : 'margin'}>
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
            <Route path="/About" element={<AboutUs />} />
            <Route path="/Contact" element={<ContactUs />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/home" element={<AdminHomePage />} />
            <Route path="/admin/home/user/:id" element={<SingleUserPage />} />
            <Route
              path="/admin/home/product/:type/:id"
              element={<SingleProduct />}
            />

            <Route path="/admin/new" element={< Admin />} />
            <Route path="/admin/userview" element={< Userview />} />
            <Route path="/admin/useredit/edit/:id" element={< AdminUedit />} />
            <Route path="/admin/userdelete/delete/:id" element={< AdminUD />} />
            <Route path="/admin/Categoryview" element={< Categoryview />} />
            <Route path="/admin/Categoryadd/" element={< Categoryadd />} />
            <Route path="/admin/Categoryedit/edit/:id" element={< CategoryEdit />} />
            <Route path="/admin/Categorydelete/delete/:id" element={< Categorydelete />} />
            <Route path="/admin/Productsview" element={< Productsview />} />
            <Route path="/admin/Productsedit/edit/:id" element={< ProductsEdit />} />
            <Route path="/admin/Productsdelete/delete/:id" element={< Productsdelete />} />
            
            <Route path="/admin/Ordersview" element={< Ordersview />} />
            <Route path="/admin/Ordersdelete/delete/:id" element={< Ordersdelete />} />
          </Routes>
        </div>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <MobileNavigation />}
      </Router>
    </>
  );
}
export default App;

