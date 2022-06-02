import React, { useState } from "react";
import "../../../../Styles/SignIn.scss";
import { useNavigate } from "react-router-dom";
import { Button, Input, Space, message } from "antd";
import { useLocation } from "react-router-dom";
import authAPI from "../../../../api/authAPI";
import { useEffect } from "react";
const InputEmailPhone = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailPhone, setEmailPhone] = useState("");
  const [formSpanCheck, setFormSpanCheck] = useState(false);
  const [spanCheck, setSpanCheck] = useState("");

  const handleCheckUser = async (e) => {
    e.preventDefault();
    try {
      if (emailPhone === "") {
        setFormSpanCheck(true);
        setSpanCheck("Chưa điền thông");
      }
      const checkemail = await authAPI.checkemail({
        email: emailPhone,
      });
      const checkphone = await authAPI.checkphone({
        phone: emailPhone,
      });
      if (checkphone === 403 && checkemail === 403) {
        setFormSpanCheck(true);
        setSpanCheck("Không tìm thấy tài khoản!");
        setEmailPhone("");
      }
      if (checkphone === 200) {
        await authAPI.sendotpphone({
          phone: emailPhone,
        });
        navigate("/checkcode", {
          state: {
            emailPhone: emailPhone,
          },
        });
      }
      if (checkemail === 200) {
        await authAPI.sendverifyemail({
          email: emailPhone,
        });
        navigate("/checkcode", {
          state: {
            emailPhone: emailPhone,
          },
        });
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
          <h1>Quên mật khẩu</h1>
          <Input
            status={formSpanCheck === true ? "error" : ""}
            placeholder={
              spanCheck === "" ? "Nhập số điện thoại / email" : spanCheck
            }
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
          />
          <div className="formsinginup">
            <Button style={{ width: "200px" }} onClick={handleCheckUser}>
              Tiếp tục
            </Button>
            <a href="/">Về trang chủ</a>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default InputEmailPhone;
