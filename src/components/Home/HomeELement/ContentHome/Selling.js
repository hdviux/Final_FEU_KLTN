import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../Styles/Sale.scss";
import "../../../../Styles/CategoryBar.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material";
import { Space } from "antd";
import ItemCard from "./ItemCard";
import SellIcon from "@mui/icons-material/Sell";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Selling = () => {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="salestyle">
      <div className="salestyletit">
        <a href="/">
          Bán chạy <SellIcon fontSize="large" />
        </a>
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
              {[1, 2, 3, 1, 2, 3, 1].map((data, index) => {
                return <ItemCard key={index} />;
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
        <a href="/">
          Xem thêm
          <ArrowRightIcon style={{ fontSize: 35 }} />
        </a>
      </div>
    </div>
  );
};

export default Selling;
