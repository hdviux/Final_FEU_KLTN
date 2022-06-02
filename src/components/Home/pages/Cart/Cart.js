import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Input } from "antd";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "antd";
import { Link } from "@mui/material";
import { Result } from "antd";
import { Empty } from "antd";
import productAPI from "../../../../api/productAPI";
import cartAPI from "../../../../api/cartAPI";
import { useSelector } from "react-redux";
import discountAPI from "../../../../api/discountAPI";
import { useNavigate } from "react-router-dom";
import ChangeCountCart from "./ChangeCountCart";
const Cart = (props) => {
  const { Search } = Input;
  const [showIcon, setShowIcon] = useState(false);
  const [search, setSearch] = useState("");
  const [selectCart, setSelectCart] = useState([]);
  const [data, setData] = useState([]);
  const [dis, setDis] = useState(false);
  const loggedInUser = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  useEffect(() => {
    const action = async () => {
      const arr = [];
      for (let index = 0; index < props.allCart.length; index++) {
        const getProduct = await productAPI.findproductbyid({
          productID: props.allCart[index].productID,
        });
        arr.push({
          key: props.allCart[index]._id,
          image: <img width={200} src={getProduct.result.image[0]} alt="" />,
          productName: getProduct.result.productName,
          price: getProduct.result.price,
          quantity: props.allCart[index].quantity,
          productID: props.allCart[index].productID,
          totalCount: getProduct.result.price * props.allCart[index].quantity,
          originQuantity: getProduct.result.quantity,
        });
      }
      setData(arr);
    };
    action();
  }, [props.allCart]);

  const handleSearchCart = async () => {
    try {
      const arr = [];
      const findCart = await cartAPI.findcartbyproductname(
        { productName: search },
        loggedInUser.accessToken
      );
      for (let index = 0; index < findCart.result.length; index++) {
        const getProduct = await productAPI.findproductbyid({
          productID: findCart.result[index].productID,
        });
        arr.push({
          key: findCart.result[index]._id,
          image: <img width={200} src={getProduct.result.image[0]} alt="" />,
          productName: getProduct.result.productName,
          price: getProduct.result.price,
          quantity: findCart.result[index].quantity,
          totalCount: getProduct.result.price * findCart.result[index].quantity,
        });
      }
      setData(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelSearch = async () => {
    try {
      setSearch("");
      const arr = [];
      for (let index = 0; index < props.allCart.length; index++) {
        const getProduct = await productAPI.findproductbyid({
          productID: props.allCart[index].productID,
        });
        arr.push({
          key: props.allCart[index]._id,
          image: <img width={200} src={getProduct.result.image[0]} alt="" />,
          productName: getProduct.result.productName,
          price: getProduct.result.price,
          quantity: props.allCart[index].quantity,
          productID: props.allCart[index].productID,
          totalCount: getProduct.result.price * props.allCart[index].quantity,
          originQuantity: getProduct.result.quantity,
        });
      }
      setData(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search === "") {
      setShowIcon(false);
    }
    if (search !== "") {
      setShowIcon(true);
    }
  }, [search]);
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectCart(selectedRowKeys);
    },
  };
  useEffect(() => {
    if (selectCart.length === 0) {
      setDis(true);
    }
    if (selectCart.length !== 0) {
      setDis(false);
    }
  }, [selectCart]);

  const columns = [
    {
      title: (
        <div>
          <Button
            onClick={async () => {
              for (let index = 0; index < selectCart.length; index++) {
                await cartAPI.deletecart(
                  { cartID: selectCart[index] },
                  loggedInUser.accessToken
                );
              }
              setTimeout(() => {
                window.location.reload(false);
              }, 1300);
            }}
            style={{ width: "120px", marginLeft: "10px" }}
            variant="danger"
            disabled={dis}
          >
            Xóa
          </Button>
        </div>
      ),
      dataIndex: "image",
    },
    {
      title: (
        <div style={{ display: "flex", width: "300px" }}>
          <h5 style={{ fontWeight: "bold" }}>Tên sản phẩm</h5>
        </div>
      ),
      dataIndex: "productName",
      render: (text, rowKey) => (
        <div>
          <Link
            underline="none"
            onClick={async () => {
              const getProduct = await productAPI.findproductbyid({
                productID: rowKey.productID,
              });
              const findDiscount = await discountAPI.finddiscount({
                productID: rowKey.productID,
              });
              navigate(`/product/${getProduct.result._id}`, {
                state: {
                  state: getProduct.result,
                  discount:
                    findDiscount.result === null
                      ? 0
                      : findDiscount.result.percent,
                },
              });
            }}
          >
            <h5
              style={{
                width: "420px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </h5>
          </Link>
        </div>
      ),
    },
    {
      title: (
        <div>
          <h5 style={{ fontWeight: "bold" }}>Giá gốc</h5>
        </div>
      ),
      dataIndex: "price",
      render: (text) => (
        <div>
          <h5>₫{text}</h5>
        </div>
      ),
    },
    {
      title: (
        <div>
          <h5 style={{ fontWeight: "bold" }}>Số lượng</h5>
        </div>
      ),
      dataIndex: "quantity",
      render: (text, rowKey) => (
        <div>{<ChangeCountCart text={text} data={rowKey} />}</div>
      ),
    },
  ];
  return (
    <div className="p-5">
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              flexDirection: "row",
              marginBottom: "25px",
            }}
          >
            <Button
              variant="danger"
              style={{ width: "200px", height: 45 }}
              disabled={dis}
              onClick={() => {
                navigate(`/pay`, {
                  state: {
                    state: selectCart,
                  },
                });
                window.location.reload(false);
              }}
            >
              Thanh toán
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginBottom: "25px",
            }}
          >
            <div
              style={{ display: "flex", width: "70%", alignItems: "center" }}
            >
              <Search
                size="large"
                placeholder="Nhập tên sản phẩm cần tìm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                suffix={
                  <div>
                    {showIcon && (
                      <button
                        onClick={cancelSearch}
                        style={{
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          border: "none",
                        }}
                      >
                        <CloseSharpIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                }
                onSearch={handleSearchCart}
                enterButton="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      </div>
      <Table
        pagination={false}
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        locale={{
          emptyText: (
            <Result
              icon={<Empty description={false} />}
              title="Không tìm thấy sản phẩm"
              subTitle="Hiện chưa có sản phẩm trong giỏ hàng"
              extra={
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  type="primary"
                >
                  Về trang chủ
                </Button>
              }
            />
          ),
        }}
      />
    </div>
  );
};

export default Cart;
