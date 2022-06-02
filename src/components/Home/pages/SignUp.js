import React, { useState } from "react";
import "../../../Styles/SignIn.scss";
import "../../../Styles/SignUp.scss";
import { useNavigate } from "react-router-dom";
import { Button, Input, Space } from "antd";
import authAPI from "../../../api/authAPI";
const SignUp = (props) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [formSpanFName, setFormSpanFName] = useState(false);
  const [formSpanLName, setFormSpanLName] = useState(false);
  const [formSpanUserName, setFormSpanUserName] = useState(false);
  const [formSpanPhone, setFormSpanPhone] = useState(false);
  const [formSpanPassword, setFormSpanPassword] = useState(false);
  const [formSpanRePassword, setFormSpanRePassword] = useState(false);

  const [spanFName, setSpanFName] = useState("");
  const [spanLName, setSpanLName] = useState("");
  const [spanUserName, setSpanUserName] = useState("");
  const [spanPhone, setSpanPhone] = useState("");
  const [spanPassword, setSpanPassword] = useState("");
  const [spanRePassword, setSpanRePassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (firstName === "") {
        setFormSpanFName(true);
        setSpanFName("Chưa nhập họ!");
      }
      if (lastName === "") {
        setFormSpanLName(true);
        setSpanLName("Chưa nhập tên!");
      }
      if (userName === "") {
        setFormSpanUserName(true);
        setSpanUserName("Chưa nhập tên tài khoản!");
      }
      if (phone === "") {
        setFormSpanPhone(true);
        setSpanPhone("Chưa nhập số điện thoại!");
      }
      if (password === "") {
        setFormSpanPassword(true);
        setSpanPassword("Chưa nhập mật khẩu!");
      }
      if (rePassword === "") {
        setFormSpanRePassword(true);
        setSpanRePassword("Chưa nhập mật khẩu xác nhận!");
      }
      if (firstName !== "") {
        setFormSpanFName(false);
        setSpanFName("");
      }
      if (lastName !== "") {
        setFormSpanLName(false);
        setSpanLName("");
      }
      if (userName !== "") {
        setFormSpanUserName(false);
        setSpanUserName("");
      }
      if (phone !== "") {
        setFormSpanPhone(false);
        setSpanPhone("");
      }
      if (password !== "") {
        setFormSpanPassword(false);
        setSpanPassword("");
      }
      if (rePassword !== "") {
        setFormSpanRePassword(false);
        setSpanRePassword("");
      }
      if (
        firstName !== "" &&
        lastName !== "" &&
        userName !== "" &&
        phone !== "" &&
        password !== "" &&
        rePassword !== ""
      ) {
        if (password === rePassword) {
          const result = await authAPI.checkphone({
            phone: phone,
          });
          if (result === 200) {
            setFormSpanPhone(true);
            setSpanPhone("Số điện thoại đã tồn tại!");
            setPhone("");
          }
          if (result === 403) {
            const resultsendotp = await authAPI.sendotpphone({
              phone: phone,
            });
            if (resultsendotp.status === 200) {
              navigate("/signupverifyphone", {
                state: {
                  firstName: firstName,
                  lastName: lastName,
                  userName: userName,
                  phone: phone,
                  password: password,
                  rePassword: rePassword,
                },
              });
            }
            if (resultsendotp.status === 400) {
              setFormSpanPhone(true);
              setSpanPhone("Số điện thoại không hợp lệ!");
              setPhone("");
            }
          }
        }
        if (password !== rePassword) {
          setFormSpanRePassword(true);
          setSpanRePassword("Mật khẩu xác nhận chưa chính xác");
          setRePassword("");
        }
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
          src={require("../../../images/well.jpg")}
          alt=""
          // onClick={(e) => {
          //   e.preventDefault();
          //   History.push("/");
          // }}
        />
      </div>
      <div className="signupr">
        <Space
          size={20}
          direction="vertical"
          style={{
            width: "80%",
          }}
        >
          <h1>Đăng kí tài khoản</h1>
          <div>
            <Space size={80}>
              <Input
                status={formSpanFName === true ? "error" : ""}
                placeholder={spanFName === "" ? "Họ" : spanFName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                status={formSpanLName === true ? "error" : ""}
                placeholder={spanLName === "" ? "Tên" : spanLName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Space>
          </div>
          <Input
            status={formSpanUserName === true ? "error" : ""}
            placeholder={spanUserName === "" ? "Tên tài khoản" : spanUserName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            status={formSpanPhone === true ? "error" : ""}
            placeholder={spanPhone === "" ? "Số điện thoại" : spanPhone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input.Password
            status={formSpanPassword === true ? "error" : ""}
            placeholder={spanPassword === "" ? "Mật khẩu" : spanPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input.Password
            status={formSpanRePassword === true ? "error" : ""}
            placeholder={
              spanRePassword === "" ? "Xác nhận mật khẩu" : spanRePassword
            }
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <div className="formsinginup">
            <Button style={{ width: "200px" }} onClick={handleSignUp}>
              Đăng kí
            </Button>
            <a href="/">Quay về trang chủ</a>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default SignUp;
