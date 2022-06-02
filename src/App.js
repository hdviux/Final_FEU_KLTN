import "./App.scss";
import React, { useLayoutEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Foot from "./components/Home/HomeELement/Footer";
import HeaderBar from "./components/Home/HomeELement/HeaderBar";
import MessageIcon from "@mui/icons-material/Message";
import HomeChoice from "./components/Home/HomeELement/HomeChoice";
import { useLocation } from "react-router-dom";
import { SpeedDial } from "@mui/material";
import Home from "./components/Home/pages/Home";
import SignIn from "./components/Home/pages/SignIn";
import SignUp from "./components/Home/pages/SignUp";
import SignUpVerifyPhone from "./components/Home/pages/SignUpVerifyPhone";
import InputEmailPhone from "./components/Home/pages/ForgetPassword/InputEmailPhone";
import CheckEmailPhone from "./components/Home/pages/ForgetPassword/CheckEmailPhone";
import NewPassword from "./components/Home/pages/ForgetPassword/NewPassword";
import UserInformation from "./components/Home/pages/User/UserInformation";
import SearchProduct from "./components/Home/pages/Product/SearchProduct/SearchProduct";
import categoryAPI from "./api/categoryAPI";
import brandAPI from "./api/brandAPI";
import ProductInformation from "./components/Home/pages/Product/ProductInformation/ProductInformation";
import Cart from "./components/Home/pages/Cart/Cart";
import cartAPI from "./api/cartAPI";
import { useSelector } from "react-redux";
import Pay from "./components/Home/pages/Pay/Pay";
import Order from "./components/Home/pages/Order/Order";
import orderAPI from "./api/orderAPI";
import PageError from "./components/Home/pages/PageError";
function App() {
  const { Header, Content, Footer } = Layout;
  const { pathname } = useLocation();
  const isSignIn = JSON.parse(localStorage.getItem("user"));
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [allCart, setAllCart] = useState([]);
  const allAge = ["0-2", "3-6", "7-12"];
  const [allOrder, setAllOrder] = useState([]);
  const [allOrderPending, setAllOrderPending] = useState([]);
  const [allOrderReceived, setAllOrderReceived] = useState([]);
  const [allOrderRefund, setAllOrderRefund] = useState([]);
  const [allOrderShipping, setAllOrderShipping] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  useLayoutEffect(() => {
    const fetchGetAllCategory = async () => {
      try {
        const getAllCategory = await categoryAPI.getallcategory();
        setAllCategory(getAllCategory.result);
        const getAllBrand = await brandAPI.getallbrand();
        setAllBrand(getAllBrand.result);
        if (isSignIn) {
          const getAllCart = await cartAPI.findcartbyuserid(
            loggedInUser.accessToken
          );
          setAllCart(getAllCart.result);
        }
        const getAllProduct = await orderAPI.getallorderbyuserid(
          loggedInUser.accessToken
        );
        setAllOrder(getAllProduct.result);
        const getAllProductPending = await orderAPI.getallorderbystatus(
          { orderStatus: "pending" },
          loggedInUser.accessToken
        );
        setAllOrderPending(getAllProductPending.result);
        const getAllProductReceived = await orderAPI.getallorderbystatus(
          { orderStatus: "received" },
          loggedInUser.accessToken
        );
        setAllOrderReceived(getAllProductReceived.result);
        const getAllProductRefund = await orderAPI.getallorderbystatus(
          { orderStatus: "refund" },
          loggedInUser.accessToken
        );
        setAllOrderRefund(getAllProductRefund.result);
        const getAllProductRefundShipping = await orderAPI.getallorderbystatus(
          { orderStatus: "shipping" },
          loggedInUser.accessToken
        );
        setAllOrderShipping(getAllProductRefundShipping.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllCategory();
  }, []);

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <HeaderBar allCartLength={allCart.length} />
        {pathname !== "/" ? null : (
          <div className="homechoi">
            <HomeChoice
              allCategory={allCategory}
              allBrand={allBrand}
              allAge={allAge}
            />
          </div>
        )}
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 130 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupverifyphone" element={<SignUpVerifyPhone />} />
          <Route path="/forgetpassword" element={<InputEmailPhone />} />
          <Route path="/checkcode" element={<CheckEmailPhone />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/user" element={<UserInformation />} />
          <Route
            path="/search"
            element={
              <SearchProduct
                allCategory={allCategory}
                allBrand={allBrand}
                allAge={allAge}
              />
            }
          />
          <Route path="/product/:productID" element={<ProductInformation />} />
          <Route path="/cart" element={<Cart allCart={allCart} />} />
          <Route path="/pay" element={<Pay />} />
          <Route
            path="/order"
            element={
              <Order
                allOrder={allOrder}
                allOrderRefund={allOrderRefund}
                allOrderPending={allOrderPending}
                allOrderReceived={allOrderReceived}
                allOrderShipping={allOrderShipping}
              />
            }
          />
          <Route path="*" element={<PageError />}/>
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Foot />
      </Footer>
      {isSignIn ? (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<MessageIcon />}
        />
      ) : null}
    </Layout>
  );
}

export default App;
