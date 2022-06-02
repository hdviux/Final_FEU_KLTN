import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../Styles/homechoistyle.scss";
import { IconButton, Link } from "@mui/material";
import { Menu, Dropdown, Divider } from "antd";
import { useNavigate } from "react-router-dom";
const HomeChoice = (props) => {
  const navigate = useNavigate();
  const menuAge = (
    <Menu>
      {props.allAge.map((data, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {index === 0 ? <br /> : null}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                fontSize: "17px",
                justifyContent: "center",
              }}
            >
              <Link
                underline="none"
                onClick={() => {
                  navigate("/search", {
                    state: {
                      search: null,
                      category: null,
                      brand: null,
                      age: data,
                    },
                  });
                }}
              >
                {data}
              </Link>
            </div>
            {index === 2 ? <br /> : <Divider />}
          </div>
        );
      })}
    </Menu>
  );
  const menuCategory = (
    <Menu>
      {props.allCategory.map((data, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {index === 0 ? <br /> : null}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                fontSize: "17px",
                justifyContent: "center",
              }}
            >
              <Link
                underline="none"
                onClick={() => {
                  navigate("/search", {
                    state: {
                      search: null,
                      category: data._id,
                      brand: null,
                      age: null,
                    },
                  });
                }}
              >
                {data.categoryName}
              </Link>
            </div>
            {index === props.allCategory.length - 1 ? <br /> : <Divider />}
          </div>
        );
      })}
    </Menu>
  );
  const menuBrand = (
    <Menu>
      {props.allBrand.map((data, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {index === 0 ? <br /> : null}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                fontSize: "17px",
                justifyContent: "center",
              }}
            >
              <Link
                underline="none"
                onClick={() => {
                  navigate("/search", {
                    state: {
                      search: null,
                      category: null,
                      brand: data._id,
                      age: null,
                    },
                  });
                }}
              >
                {data.brandName}
              </Link>
            </div>
            {index === props.allBrand.length - 1 ? <br /> : <Divider />}
          </div>
        );
      })}
    </Menu>
  );
  return (
    <div className="homechoistyle">
      <IconButton
        onClick={() => {
          navigate("/search", {
            state: {
              type: "sale",
            },
          });
        }}
      >
        <div className="tithomechoistyle">Đang giảm giá</div>
      </IconButton>
      <Dropdown overlay={menuAge} placement="bottom" arrow>
        <IconButton>
          <div className="tithomechoistyle">Độ tuổi</div>
        </IconButton>
      </Dropdown>
      <Dropdown overlay={menuCategory} placement="bottom" arrow>
        <IconButton>
          <div className="tithomechoistyle">Loại đồ chơi</div>
        </IconButton>
      </Dropdown>
      <Dropdown overlay={menuBrand} placement="bottom" arrow>
        <IconButton>
          <div className="tithomechoistyle">Thương hiệu</div>
        </IconButton>
      </Dropdown>
    </div>
  );
};

export default HomeChoice;
