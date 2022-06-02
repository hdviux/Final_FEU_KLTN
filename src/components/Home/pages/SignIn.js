import React, { useState } from "react";
import "../../../Styles/SignIn.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../../app/userSlice";
import { Button, Input, Space } from "antd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { auth } from "../../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import authAPI from "../../../api/authAPI";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
const SignIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");

  const [formSpanEmailPhone, setFormSpanEmailPhone] = useState(false);
  const [formSpanPassword, setFormSpanPassword] = useState(false);

  const [spanEmailPhone, setSpanEmailPhone] = useState("");
  const [spanPassword, setSpanPassword] = useState("");
  const handleSignInByAccountFacebook = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, facebookProvider);
      const result = await authAPI.checkemail({
        email: res.user.email,
      });
      console.log(res);
      if (result === 200) {
        const data = await authAPI.signinbyonceemail({
          email: `facebook_${res.user.email}`,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        navigate("/");
        window.location.reload(false);
      }
      if (result === 403) {
        await authAPI.signupbyonceemail({
          fullName: res.user.displayName,
          userName: res.user.displayName,
          email: `facebook_${res.user.email}`,
          password: res.user.uid,
          avatar: res.user.photoURL,
        });
        const data = await authAPI.signinbyonceemail({
          email: `facebook_${res.user.email}`,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        navigate("/");
        window.location.reload(false);
      }
    } catch (error) {
      const email = error.customData.email;
      const result = await authAPI.checkemail({
        email: `facebook_${email}`,
      });
      if (result === 200) {
        const data = await authAPI.signinbyonceemail({
          email: `facebook_${email}`,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        navigate("/");
        window.location.reload(false);
      }
      if (result === 403) {
        await authAPI.signupbyonceemail({
          fullName: error.customData._tokenResponse.displayName,
          userName: error.customData._tokenResponse.displayName,
          email: `facebook_${email}`,
          password: error.customData._tokenResponse.localId,
          avatar: error.customData._tokenResponse.photoURL,
        });
        const data = await authAPI.signinbyonceemail({
          email: `facebook_${email}`,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        navigate("/");
        window.location.reload(false);
      }
    }
  };
  const handleSignInByAccountEmail = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      const result = await authAPI.checkemail({
        email: `google_${res.user.email}`,
      });
      console.log(res);
      if (result === 200) {
        const data = await authAPI.signinbyonceemail({
          email: `google_${res.user.email}`,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        navigate("/");
        window.location.reload(false);
      }
      if (result === 403) {
        await authAPI.signupbyonceemail({
          fullName: res.user.displayName,
          userName: res.user.displayName,
          email: `google_${res.user.email}`,
          password: res.user.uid,
          avatar: res.user.photoURL,
        });
        const data = await authAPI.signinbyonceemail({
          email: `google_${res.user.email}`,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        navigate("/");
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      if (emailPhone === "") {
        setFormSpanEmailPhone(true);
        setSpanEmailPhone("Chưa nhập email/số điện thoại!");
      }
      if (password === "") {
        setFormSpanPassword(true);
        setSpanPassword("Chưa nhập mật khẩu");
      }
      if (emailPhone !== "") {
        setFormSpanEmailPhone(false);
        setSpanEmailPhone("");
      }
      if (password !== "") {
        setFormSpanPassword(false);
        setSpanPassword("");
      }
      if (emailPhone !== "" && password !== "") {
        setFormSpanEmailPhone(false);
        setFormSpanPassword(false);
        const action = signin({
          emailPhone: emailPhone,
          password: password,
        });
        const resultAction = await dispatch(action);
        if (resultAction.payload === null) {
          setFormSpanEmailPhone(true);
          setSpanEmailPhone("Không tìm thấy tài khoản!");
          setEmailPhone("");
        }

        if (resultAction.payload.status === 400) {
          setFormSpanPassword(true);
          setSpanPassword("Mật khẩu chưa chính xác!");
          setPassword("");
        }

        if (resultAction.payload.status === 200) {
          if (resultAction.payload.user.role === 1) {
            setFormSpanPassword(true);
            setSpanPassword("Không thể đăng nhập bằng tài khoản admin!");
            setPassword("");
          }
          if (resultAction.payload.user.role === 2) {
            if (resultAction.payload.status === 200) {
              unwrapResult(resultAction);
              navigate("/");
            }
          }
          if (resultAction.payload.user.role === 3) {
            setFormSpanPassword(true);
            setSpanPassword("Tài khoản đang bị khóa!");
          }
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
          <h1>Đăng nhập</h1>
          <Input
            status={formSpanEmailPhone === true ? "error" : ""}
            placeholder={
              spanEmailPhone === ""
                ? "Nhập số điện thoại / email"
                : spanEmailPhone
            }
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
            prefix={<PersonOutlineIcon />}
          />
          <Input.Password
            status={formSpanPassword === true ? "error" : ""}
            placeholder={spanPassword === "" ? "Nhập mật khẩu" : spanPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOpenOutlinedIcon />}
          />
          <div className="formsinginup">
            <Button style={{ width: "200px" }} onClick={handleSignIn}>
              Đăng nhập
            </Button>
            <a href="/signup">Đăng kí</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/forgetpassword">Quên mật khẩu</a>
          </div>
          <button
            style={{
              width: "250px",
              display: "flex",
              alignItems: "center",
              background: "#dd4b39",
              color: "white",
              border: "none",
              height: "40px",
              borderRadius: "7px",
            }}
            onClick={handleSignInByAccountEmail}
          >
            <GoogleIcon style={{ marginRight: 20 }} />
            Đăng nhập bằng Gmail
          </button>
          <button
            style={{
              width: "250px",
              display: "flex",
              alignItems: "center",
              background: "#3b5998",
              color: "white",
              border: "none",
              height: "40px",
              borderRadius: "7px",
            }}
            onClick={handleSignInByAccountFacebook}
          >
            <FacebookIcon style={{ marginRight: 20 }} />
            Đăng nhập bằng Facebook
          </button>
        </Space>
      </div>
    </div>
  );
};

export default SignIn;
