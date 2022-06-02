import React, { useState } from "react";
import "../../../../Styles/SignIn.scss";
import { useNavigate } from "react-router-dom";
import { Button, Input, Space, message } from "antd";
import { useLocation } from "react-router-dom";
import authAPI from "../../../../api/authAPI";

const NewPassword = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formSpanNewPassword, setFormSpanNewPassword] = useState(false);
  const [formSpanOldPassword, setFormSpanOldPassword] = useState(false);
  const [spanNewPassword, setSpanNewPassword] = useState("");
  const [spanOldPassword, setSpanOldPassword] = useState("");

  const handleForgetPassword = async () => {
    try {
      if (oldPassword === "") {
        setFormSpanOldPassword(true);
        setSpanOldPassword("Chưa nhập mật khẩu!");
      }
      if (newPassword === "") {
        setFormSpanNewPassword(true);
        setSpanNewPassword("Chưa nhập mật khẩu!");
      }
      if (
        oldPassword === newPassword &&
        oldPassword !== "" &&
        oldPassword !== ""
      ) {
        console.log(location);
        await authAPI.forgetpassword({
          emailPhone: location.state.emailPhone,
          newPassword: newPassword,
        });
        navigate("/signin");
        message.success("Đổi thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signin">
      <div className="signinl">
        <img
          className="logo"
          src={require("../../../../images/well.jpg")}
          alt=""
        />
      </div>
      <div className="signinr">
        <Space
          size={20}
          direction="vertical"
          style={{
            width: "80%",
          }}
        >
          <h1>Nhập mật khẩu mới</h1>
          <Input.Password
            status={formSpanOldPassword === true ? "error" : ""}
            placeholder={
              spanOldPassword === "" ? "Nhập mật khẩu" : spanOldPassword
            }
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input.Password
            status={formSpanNewPassword === true ? "error" : ""}
            placeholder={
              spanNewPassword === "" ? "Xác nhận mật khẩu" : spanNewPassword
            }
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="formsinginup">
            <Button style={{ width: "200px" }} onClick={handleForgetPassword}>
              Xác nhận
            </Button>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default NewPassword;
