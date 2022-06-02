import React from "react";
import { useRef } from "react";
import "../../../Styles/CategoryBar.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material";
import { Card } from "antd";
const CategoryBar = () => {
  const { Meta } = Card;
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="conme">
      <IconButton onClick={() => scroll(-100)}>
        <LeftOutlined className="iconnp" style={{ color: "white" }} />
      </IconButton>
      <div className="conme1" ref={ref}>
        {[1, 2, 3, 1, 2, 3, 1].map((data, index) => {
          return (
            <Card
              key={index}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          );
        })}
      </div>
      <IconButton onClick={() => scroll(100)}>
        <RightOutlined className="iconnp" style={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default CategoryBar;
