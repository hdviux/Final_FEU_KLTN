import React, { useLayoutEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../Styles/Sale.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IconButton, Link } from "@mui/material";
import { Space } from "antd";
import ItemCard from "./ItemCard";
import DiscountIcon from "@mui/icons-material/Discount";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import discountAPI from "../../../../api/discountAPI";
import evaluateAPI from "../../../../api/evaluateAPI";
import { useNavigate } from "react-router-dom";
const Sale = () => {
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  useLayoutEffect(() => {
    const action = async () => {
      const prevData = await discountAPI.findproductdiscount();
      const arr = [];
      for (let index = 0; index < prevData.result.length; index++) {
        const getEvaluate = await evaluateAPI.findevaluatebyproductid({
          productID: prevData.result[index]._id,
        });
        arr.push({
          _id: prevData.result[index]._id,
          productName: prevData.result[index].productName,
          image: prevData.result[index].image,
          quantity: prevData.result[index].quantity,
          price: prevData.result[index].price,
          description: prevData.result[index].description,
          categoryID: prevData.result[index].categoryID,
          brandID: prevData.result[index].brandID,
          age: prevData.result[index].age,
          avgEvaluate: getEvaluate.result.avgEvaluate,
          totalCount: getEvaluate.result.totalCount,
        });
      }
      const myData = []
        .concat(arr)
        .sort((a, b) => (a.avgEvaluate < b.avgEvaluate ? 1 : -1));
      setData(myData);
    };
    action();
  }, []);

  return (
    <div className="salestyle">
      <div className="salestyletit">
        <Link
          underline="none"
          onClick={() => {
            navigate("/search", {
              state: {
                type: "sale",
              },
            });
          }}
        >
          Giảm giá - Khuyến mãi <DiscountIcon fontSize="large" />
        </Link>
      </div>
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <div
          style={{
            width: 100,
            borderBottom: "1.5px solid black",
            marginBottom: "50px",
          }}
        ></div>
      </div>
      <div className="salestylecontent">
        <div className="conme">
          <div className="btnnp">
            <IconButton onClick={() => scroll(-100)}>
              <LeftOutlined className="iconnp" style={{ color: "#144c95" }} />
            </IconButton>
          </div>
          <div className="conme1" ref={ref}>
            <Space size={30}>
              {data.map((data, index) => {
                return <ItemCard key={index} data={data} />;
              })}
            </Space>
          </div>
          <div className="btnnp">
            <IconButton onClick={() => scroll(100)}>
              <RightOutlined className="iconnp" style={{ color: "#144c95" }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="salestylebot">
        <Link
          underline="none"
          onClick={() => {
            navigate("/search", {
              state: {
                type: "sale",
              },
            });
          }}
        >
          Xem thêm
          <ArrowRightIcon style={{ fontSize: 35 }} />
        </Link>
      </div>
    </div>
  );
};

export default Sale;
