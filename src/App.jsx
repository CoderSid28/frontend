import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import { useSelector } from "react-redux";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import PaymentReceipt from "./pages/PaymentReceipt";
import Help from "./components/Help/Help";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
        {role === "user" ?( <Route index element={<Favourites />} />): (<Route index element={<AllOrders />} />)}
{role === "admin" && (<Route path="/profile/add-book" element={<AddBook />} />)}
<Route path="/profile/orderHistory" element={<UserOrderHistory />} />
<Route path="/profile/settings" element={<Settings />} />
       </Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/payment/receipt" element={<PaymentReceipt />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
