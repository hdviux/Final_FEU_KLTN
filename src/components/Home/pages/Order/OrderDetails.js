import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import orderAPI from "../../../../api/orderAPI";
import productAPI from "../../../../api/productAPI";
import { Spinner } from "react-bootstrap";
import { Link } from "@mui/material";
import ButtonOrderDetail from "./ButtonOrderDetail";

const OrderDetails = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGetAllOrderDetails = async () => {
      try {
        const arr = [];
        const getAllOrderDetails = await orderAPI.getallorderdetailbyorderid(
          { orderID: props.data },
          loggedInUser.accessToken
        );
        for (let index = 0; index < getAllOrderDetails.result.length; index++) {
          const getProduct = await productAPI.findproductbyid({
            productID: getAllOrderDetails.result[index].productID,
          });
          arr.push({
            key: getAllOrderDetails.result[index]._id,
            image: (
              <img
                style={{ width: "100px" }}
                src={getProduct.result.image[0]}
                alt=""
              />
            ),
            productEvaluate: getProduct.result.evaluate,
            productData: getProduct.result,
            productID: getProduct.result._id,
            productName: getProduct.result.productName,
            price: getProduct.result.price,
            quantity: getAllOrderDetails.result[index].quantity,
            totalCount:
              getProduct.result.price *
              getAllOrderDetails.result[index].quantity,
          });
        }
        setData(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllOrderDetails();
  }, []);

  const columns = [
    {
      dataIndex: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      render: (text, rowKey) => (
        <Link underline="none">
          <h6
            style={{
              width: "420px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </h6>
        </Link>
      ),
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tổng đơn giá",
      dataIndex: "totalCount",
    },
    {
      title: "",
      dataIndex: "",
      render: (rowKey) => (
        <ButtonOrderDetail rowKey={rowKey} items={props.items} />
      ),
    },
  ];

  return (
    <div>
      {loading === true ? (
        <snip>
          <div
            style={{
              display: "flex",
              flex: 1,
              marginTop: "50px",
              marginBottom: "50px",
              justifyContent: "center",
            }}
          >
            <Spinner
              animation="border"
              variant="success"
              style={{ height: "25px", width: "25px", fontSize: "10px" }}
            />
          </div>
        </snip>
      ) : (
        <Table columns={columns} dataSource={data} size="small" />
      )}
    </div>
  );
};
export default OrderDetails;
