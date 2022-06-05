import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import cartAPI from "../../../../api/cartAPI";
import productAPI from "../../../../api/productAPI";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Dropdown } from "react-bootstrap";
import orderAPI from "../../../../api/orderAPI";

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.current);
  const [listCart, setListCart] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ord, setOrd] = useState("Thanh toán trực tiếp");
  const [formOrd, setFormOrd] = useState(false);
  useEffect(() => {
    const fetchGetCart = async () => {
      try {
        // if (pathn === "onecart") {
        //   setTimeout(() => {
        //     setLoading(false);
        //   }, 2000);
        // } else {
        let arr = [];
        let price = null;
        for (let index = 0; index < location.state.state.length; index++) {
          const getCart = await cartAPI.findcartbyid(
            { cartID: location.state.state[index] },
            loggedInUser.accessToken
          );
          arr.push(getCart.result);
        }
        setListCart(arr);
        let arrproduct = [];
        for (let index = 0; index < arr.length; index++) {
          const getProduct = await productAPI.findproductbyid({
            productID: arr[index].productID,
          });
          arrproduct.push(getProduct.result);
          price += arr[index].quantity * getProduct.result.price;
        }
        setListProduct(arrproduct);
        setTotalPrice(price);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetCart();
  }, []);

  const handleOrder = async () => {
    try {
      if (!loggedInUser.user.phone || !loggedInUser.user.address) {
        Swal.fire({
          title: "Chưa cập nhật thông tin cá nhân!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (loggedInUser.user.phone && loggedInUser.user.address) {
        if (location.state.state.image) {
          const createOrder = await orderAPI.addorder(loggedInUser.accessToken);
          await orderAPI.addorderdetail(
            {
              orderID: createOrder.result._id,
              productID: location.state.state._id,
              quantity: location.state.state.quantity,
              cartID: null,
            },
            loggedInUser.accessToken
          );

          navigate("/cart");
          window.location.reload(false);
        } else {
          const createOrder = await orderAPI.addorder(loggedInUser.accessToken);
          for (let index = 0; index < location.state.state.length; index++) {
            await orderAPI.addorderdetail(
              {
                orderID: createOrder.result._id,
                productID: null,
                quantity: null,
                cartID: location.state.state[index],
              },
              loggedInUser.accessToken
            );
          }
          navigate("/cart");
          window.location.reload(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            height: "100px",
            marginTop: "20px",
            background: "white",
            borderTop: "5px solid #d32f2f",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <LocationOnIcon fontSize="large" color="error" />
            <h4 style={{ color: "#d32f2f" }}>Địa chỉ nhận hàng</h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            {!loggedInUser.user.phone || !loggedInUser.user.address ? (
              <h5 className="ms-3">Chưa cập nhật đầy đủ thông tin</h5>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="ms-3">
                  {loggedInUser.user.fullName} ({loggedInUser.user.phone}
                  )&nbsp;&nbsp;&nbsp;&nbsp;
                </h5>
                <h6 style={{ marginTop: "3px" }}>
                  {loggedInUser.user.address}
                </h6>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-end",
                marginRight: "100px",
              }}
            >
              <Link
                onClick={() => {
                  navigate("/user");
                }}
                underline="none"
                style={{ fontSize: "18px" }}
              >
                Thay đổi
              </Link>
            </div>
          </div>
        </Box>
      </div>
      <Box
        sx={{
          width: "100%",
          marginTop: "20px",
          background: "white",
          borderTop: "5px solid #d32f2f",
          flexDirection: "column",
        }}
      >
        <Table responsive>
          <thead>
            <tr>
              <td style={{ width: "55%" }}>
                <h4>Sản phẩm</h4>
              </td>
              <td style={{ width: "15%" }}>
                <h6>Đơn giá</h6>
              </td>
              <td style={{ width: "15%" }}>
                <h6>Số lượng</h6>
              </td>
              <td style={{ width: "15%" }}>
                <h6>Thành tiền</h6>
              </td>
            </tr>
          </thead>
          <tbody>
            {location.state.state.image ? (
              <tr>
                <td>
                  <div
                    style={{
                      height: "100px",
                      alignItems: "center",
                      display: "flex",
                      width: "90%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <img
                      style={{
                        width: "200px",
                      }}
                      src={location.state.state.image[0]}
                      alt=""
                    />
                    <Link underline="none">
                      <h5 className="ms-3">
                        {location.state.state.productName}
                      </h5>
                    </Link>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      height: "100px",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <h5>₫{location.state.state.price}</h5>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      height: "100px",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <h5>{location.state.state.quantity}</h5>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      height: "100px",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <h5 style={{ color: "#d32f2f" }}>
                      ₫
                      {Number(location.state.state.price) *
                        Number(location.state.state.quantity)}
                    </h5>
                  </div>
                </td>
              </tr>
            ) : null}
            {listProduct.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div
                      style={{
                        height: "100px",
                        alignItems: "center",
                        display: "flex",
                        width: "90%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <img
                        style={{
                          width: "200px",
                        }}
                        src={data.image[0]}
                        alt=""
                      />
                      <Link underline="none">
                        <h5 className="ms-3">{data.productName}</h5>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        height: "100px",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <h5>₫{data.price}</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        height: "100px",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <h5>{listCart[index].quantity}</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        height: "100px",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <h5 style={{ color: "#d32f2f" }}>
                        ₫{data.price * listCart[index].quantity}
                      </h5>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          background: "white",
          padding: 40,
        }}
      >
        <h4 style={{ color: "#d32f2f" }}>
          Tổng tiền: ₫
          {location.state.state.image
            ? Number(location.state.state.price) *
              Number(location.state.state.quantity)
            : totalPrice}
        </h4>
      </div>
      <Box
        sx={{
          width: "100%",
          marginTop: "40px",
          background: "white",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100px",
            alignItems: "center",
            borderTop: "5px solid #d32f2f",
          }}
        >
          <h5 className="ms-2">Phương thức thanh toán</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "60%",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              color: "#d32f2f",
              fontWeight: "bold",
            }}
          >
            {ord}
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-end",
              marginRight: "100px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="danger">Thay đổi</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setOrd("Thanh toán trực tiếp");
                    setFormOrd(false);
                  }}
                >
                  Thanh toán trực tiếp
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={
                    !loggedInUser.user.phone || !loggedInUser.user.address
                      ? true
                      : false
                  }
                  onClick={() => {
                    setOrd("Thay toán bằng thẻ tín dụng");
                    setFormOrd(true);
                  }}
                >
                  Thanh toán qua paypal
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {formOrd && (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div style={{ width: "40%" }}>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AScvWPcsjpRYb_TjoGMqYJoKj2ePeKOiv7HkOVQU6VUy2hAhGlZJphXmU-P9H4SAAjPfMa6YsftpXbXS",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: location.state.state.image
                              ? `${(
                                  (Number(location.state.state.price) *
                                    Number(location.state.state.quantity)) /
                                  23000
                                ).toFixed()}`
                              : `${(totalPrice / 23000).toFixed}`,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={() => {
                    handleOrder();
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "200px",
            alignItems: "center",
            borderTop: "1px solid rgba(218, 218, 218, 0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-end",
              marginRight: "100px",
            }}
          >
            <div>
              <h6>Tổng tiền hàng:</h6>
              <h6>Phí vận chuyển:</h6>
              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <h6>Tổng thanh toán:</h6>
              </div>
            </div>
            <div className="ms-5">
              <h6>
                ₫
                {location.state.state.image
                  ? Number(location.state.state.price) *
                    Number(location.state.state.quantity)
                  : totalPrice}
              </h6>
              <h6>₫0</h6>
              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "17px",
                }}
              >
                <h3 style={{ fontWeight: "bold", color: "#d32f2f" }}>
                  ₫
                  {location.state.state.image
                    ? Number(location.state.state.price) *
                      Number(location.state.state.quantity)
                    : totalPrice}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {!formOrd && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100px",
              alignItems: "center",
              borderTop: "1px solid rgba(218, 218, 218, 0.5)",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                background: "#d32f2f",
                border: "none",
                color: "white",
                width: "200px",
                height: "50px",
                borderRadius: "5px",
                marginRight: "100px",
              }}
              onClick={handleOrder}
            >
              Đặt hàng
            </button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Pay;
