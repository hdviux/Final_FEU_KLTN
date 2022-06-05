import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BsFillCartFill } from "react-icons/bs";
import { Badge, Dropdown, Menu } from "antd";
import { Typography, Space, Button } from "antd";
import { ReloadOutlined, SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "../../../App.scss";
import { IconButton, Link } from "@mui/material";
import Button2 from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import authAPI from "../../../api/authAPI";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
const HeaderBar = (props) => {
  const { Title } = Typography;
  const isSignIn = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [dis, setDis] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    try {
      await authAPI.logout({
        refreshToken: JSON.parse(localStorage.getItem("user")),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (search === "") {
      setDis(true);
    }
    if (search !== "") {
      setDis(false);
    }
  }, [search]);
  const handleSearch = () => {
    navigate("/search", {
      state: {
        search: search,
        category: null,
        brand: null,
        age: null,
      },
    });
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => navigate("/user")}
            >
              <UserOutlined style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-2">Quản lý tài khoản</h6>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => navigate("/order")}
            >
              <UnorderedListOutlined  style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-2">Quản lý hóa đơn</h6>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={handleLogOut}
            >
              <LogoutOutlined style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-1">Đăng xuất</h6>
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <div className="tit">
      <Link href="/" underline="none">
        <Title
          level={1}
          style={{ color: "#144c95", fontWeight: "bold", marginTop: "15px" }}
        >
          TOYSKID
        </Title>
      </Link>
      <div className="cont">
        <div className="search">
          <input
            className="divsearch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            disabled={dis}
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          />
        </div>
        <div className="con">
          {isSignIn ? (
            <Space size={40}>
              {/* <Badge count={5}>
                <IconButton>
                  <NotificationsIcon className="icons" />
                </IconButton>
              </Badge> */}
              <Dropdown overlay={menu} placement="bottom" arrow>
                <IconButton>
                  <AccountCircleIcon className="icons" />
                </IconButton>
              </Dropdown>
              <Badge count={props.allCartLength}>
                <IconButton onClick={() => navigate("/cart")}>
                  <BsFillCartFill className="icons" />
                </IconButton>
              </Badge>
            </Space>
          ) : (
            <div style={{ display: "flex", height: "80%" }}>
              <Space size={40}>
                <Button2
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/signin")}
                >
                  Đăng nhập
                </Button2>
                <Button2
                  variant="contained"
                  onClick={() => navigate("/signup")}
                >
                  Đăng kí
                </Button2>
              </Space>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
