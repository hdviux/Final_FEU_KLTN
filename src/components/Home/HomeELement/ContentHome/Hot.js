import React, { useLayoutEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../Styles/Sale.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IconButton, Link } from "@mui/material";
import { Space } from "antd";
import ItemCard from "./ItemCard";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import productAPI from "../../../../api/productAPI";
import { useNavigate } from "react-router-dom";
const Hot = () => {
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  useLayoutEffect(() => {
    const action = async () => {
      const prevData = await productAPI.getproducthot();
      setData(prevData.result);
    };
    action();
  }, []);
  console.log(123,data);
  return (
    <div className="salestyle">
      <div className="salestyletit">
        <Link
          underline="none"
          onClick={() => {
            navigate("/search", {
              state: {
                type: "hot",
              },
            });
          }}
        >
          Sản phẩm nổi bật <LocalFireDepartmentIcon fontSize="large" />
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
                type: "hot",
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

export default Hot;
