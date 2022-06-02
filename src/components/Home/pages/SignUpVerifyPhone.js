import React, { useState } from "react";
import "../../../Styles/SignIn.scss";
import { useNavigate } from "react-router-dom";
import { Button, Input, Space, message } from "antd";
import { useLocation } from "react-router-dom";
import authAPI from "../../../api/authAPI";
import { useEffect } from "react";
const SignUpVerifyPhone = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [formSpanCode, setFormSpanCode] = useState(false);
  const [spanCode, setSpanCode] = useState("");
  const [time, setTime] = useState(0);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (code === "") {
        setFormSpanCode(true);
        setSpanCode("Chưa nhập mã xác nhận!");
      }
      // if (code.length !== "") {
      //   setFormSpanCode(true);
      //   setSpanCode("Mã xác nhận không hợp lệ!");
      //   setCode("");
      // }
      if (code !== "") {
        setSpanCode("");
        setFormSpanCode(false);
        const result = await authAPI.verifyotpphone({
          phone: location.state.phone,
          code: code,
        });
        if (result.status === 200) {
          await authAPI.signupbyphone({
            fullName: location.state.firstName + " " + location.state.lastName,
            userName: location.state.userName,
            phone: location.state.phone,
            password: location.state.password,
          });
          navigate("/signin");
          message.success("Đăng kí thành công!");
        }
        if (result.status === 400) {
          setFormSpanCode(true);
          setSpanCode("Mã xác nhận chưa chính xác!");
          setCode("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setFormSpanCode(false);
      const result = await authAPI.sendotpphone({
        phone: location.state.phone,
      });
      if (result.status === 200) {
        setTime(10);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);
  return (
    <div className="signin">
      <div className="signinl">
        <img
          className="logo"
          src={require("../../../images/well.jpg")}
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
          <h1>Nhập mã xác nhận</h1>
          <Input
            status={formSpanCode === true ? "error" : ""}
            placeholder={spanCode === "" ? "Nhập mã xác nhận" : spanCode}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="formsinginup">
            <Button style={{ width: "200px" }} onClick={handleVerify}>
              Xác nhận
            </Button>
            {time === 0 ? (
              <a onClick={handleSendOTP}>Gửi lại mã</a>
            ) : (
              <a>{time}s</a>
            )}
          </div>
        </Space>
      </div>
    </div>
  );
};

export default SignUpVerifyPhone;
