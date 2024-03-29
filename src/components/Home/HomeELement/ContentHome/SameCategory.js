import React, { useLayoutEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../Styles/Sale.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IconButton, Link } from "@mui/material";
import { Space } from "antd";
import ItemCard from "./ItemCard";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import productAPI from "../../../../api/productAPI";
import evaluateAPI from "../../../../api/evaluateAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SameCategory = (props) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  useLayoutEffect(() => {
    const action = async () => {
      const prevData = await productAPI.getproductsamecategory({
        categoryID: props.data.categoryID,
      });
      setData(prevData.result);
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
                search: null,
                category: props.data.categoryID,
                brand: null,
                age: null,
              },
            });
          }}
        >
          Sản phẩm cùng loại
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
          onClick={() => {
            navigate("/search", {
              state: {
                search: null,
                category: props.data.categoryID,
                brand: null,
                age: null,
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

export default SameCategory;
