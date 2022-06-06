import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../../../Styles/ProductInformation.scss";
import Carousel from "react-bootstrap/Carousel";
import { Image, Rate, Typography } from "antd";
import { Button, ButtonGroup } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Comment from "./Comment/Comment";
import ProductDetail from "./ProductDetail";
import SameCategory from "../../../HomeELement/ContentHome/SameCategory";
import evaluateAPI from "../../../../../api/evaluateAPI";
import cartAPI from "../../../../../api/cartAPI";
import orderAPI from "../../../../../api/orderAPI";
import { useSelector } from "react-redux";
const ProductInformation = (props) => {
  const isSignIn = JSON.parse(localStorage.getItem("user"));
  const { Text } = Typography;
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [btnAdd, setBtnAdd] = useState(false);
  const [btnRemove, setBtnRemove] = useState(true);
  const [getEvaluate, setGetEvaluate] = useState("");
  const [per, setPer] = useState("");
  const loggedInUser = useSelector((state) => state.user.current);
  const addCount = () => {
    if (count !== location.state.state.quantity) {
      setCount(Number(count) + 1);
    }
    if (count === location.state.state.quantity) {
      setCount(location.state.state.quantity);
    }
  };
  const removeCount = () => {
    if (count === 1) {
      setCount(1);
    }
    if (count > 1) {
      setCount(Number(count) - 1);
    }
  };

  useLayoutEffect(() => {
    const action = async () => {
      window.scrollTo(0, 0);
      const getEvaluate = await evaluateAPI.findevaluatebyproductid({
        productID: location.state.state._id,
      });
      setGetEvaluate(getEvaluate.result);
      const getDetail = await orderAPI.getcountpurchase({
        productID: location.state.state._id,
      });
      setPer(getDetail.result);
    };
    action();
  }, []);

  useEffect(() => {
    if (Number(count) <= 1) {
      setCount(1);
      setBtnRemove(true);
      setBtnAdd(false);
    }
    if (Number(count) > 1) {
      setCount(count);
      setBtnRemove(false);
      setBtnAdd(false);
    }
    if (Number(count) >= location.state.state.quantity) {
      setCount(location.state.state.quantity);
      setBtnRemove(false);
      setBtnAdd(true);
    }
  }, [count]);
  const handleAddCart = async () => {
    try {
      if (isSignIn !== null) {
        await cartAPI.addcart(
          { productID: location.state.state._id, quantity: count },
          loggedInUser.accessToken
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
      if (!isSignIn) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    try {
      if (isSignIn !== null) {
        navigate(`/pay`, {
          state: {
            state: {
              _id: location.state.state._id,
              quantity: count,
              productName: location.state.state.productName,
              price: location.state.state.price,
              image: location.state.state.image,
            },
          },
        });
      }
      if (!isSignIn) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="productcon">
      <div className="productinfo">
        <div className="infoleft">
          <div
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Carousel
              variant="dark"
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {location.state.state.image.map((item, index) => (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Image height={380} src={item} alt="" />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="inforight">
          <div style={{ paddingLeft: 60, paddingRight: 20 }}>
            <div
              style={{
                display: "flex",
                width: "85%",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <h4 style={{ width: "100%" }}>
                {location.state.state.productName}
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                width: "85%",
                marginLeft: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textDecorationLine: "underline",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#ee4d2d",
                  }}
                >
                  {location.state.state.avgEvaluate}
                </div>
                &nbsp;
                <Rate
                  style={{ fontSize: "16px", color: "#ee4d2d" }}
                  allowHalf
                  value={Number(getEvaluate.avgEvaluate)}
                  disabled={true}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                &nbsp;|&nbsp;
                <div
                  style={{
                    textDecorationLine: "underline",
                    fontSize: "20px",
                  }}
                >
                  {location.state.state.totalCount}
                </div>
                &nbsp;
                <div style={{ fontSize: "15px" }}>đánh giá</div>
                &nbsp;|&nbsp;
                <div
                  style={{
                    textDecorationLine: "underline",
                    fontSize: "20px",
                  }}
                >
                  {per}
                </div>
                &nbsp;
                <div style={{ fontSize: "15px" }}>sản phẩm đã bán</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "85%",
                flex: 1,
                height: "80px",
                borderTop: "2px solid rgba(218, 218, 218, 0.5)",
                marginTop: "20px",
                marginLeft: "20px",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <h4>Giá bán: </h4>
                  {location.state.discount === 0 ? (
                    <h4 style={{ color: "#ee4d2d", fontWeight: "bold" }}>
                      &nbsp;&nbsp;{location.state.state.price}₫
                    </h4>
                  ) : (
                    <div
                      style={{ display: "flex", flex: 1, flexDirection: "row" }}
                    >
                      <Text delete className="me-5 ms-5">
                        <h4>{location.state.state.price}₫</h4>
                      </Text>
                      <h4 style={{ color: "#ee4d2d", fontWeight: "bold" }}>
                        {location.state.state.price *
                          ((100 - location.state.discount) / 100)}
                        ₫
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "85%",
                flex: 1,
                height: "80px",
                marginLeft: "20px",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <h5>Số lượng:&nbsp;&nbsp;</h5>
                <ButtonGroup aria-label="Basic example">
                  <Button
                    variant="outline-secondary"
                    onClick={removeCount}
                    disabled={btnRemove}
                  >
                    <RemoveIcon />
                  </Button>
                  <input
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={addCount}
                    disabled={btnAdd}
                  >
                    <AddIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "85%",
                flex: 1,
                height: "80px",
                marginTop: "20px",
                marginLeft: "20px",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <h4>Tổng tiền: </h4>
                  {location.state.discount === 0 ? (
                    <h4 style={{ color: "#ee4d2d", fontWeight: "bold" }}>
                      &nbsp;&nbsp;{location.state.state.price * count}₫
                    </h4>
                  ) : (
                    <div
                      style={{ display: "flex", flex: 1, flexDirection: "row" }}
                    >
                      <Text delete className="me-5 ms-5">
                        <h4>{location.state.state.price * count}₫</h4>
                      </Text>
                      <h4 style={{ color: "#ee4d2d", fontWeight: "bold" }}>
                        {location.state.state.price *
                          count *
                          ((100 - location.state.discount) / 100)}
                        ₫
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "85%",
              flex: 1,
              height: "80px",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="danger"
                style={{ width: "40%" }}
                onClick={handleBuy}
              >
                Mua ngay
              </Button>
              <Button
                variant="outline-danger"
                style={{ width: "40%" }}
                onClick={handleAddCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="productavacomment">
        <div className="lefcom">
          <ProductDetail data={location.state.state} />
        </div>
        <div className="rigcom">
          <Comment getEvaluate={getEvaluate} data={location.state.state}/>
        </div>
      </div>
      <SameCategory data={location.state.state} />
    </div>
  );
};

export default ProductInformation;
