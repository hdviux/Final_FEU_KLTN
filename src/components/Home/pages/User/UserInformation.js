import React, { useState } from "react";
import "../../../../Styles/UserInformation.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { ListGroup, Button, Form } from "react-bootstrap";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Avatar from "@mui/material/Avatar";
import ModalUpdatePhone from "./ModalUpdatePhone";
import ModalUpdateEmail from "./ModalUpdateEmail";
import ModalUpdatePassword from "./ModalUpdatePassword";
import moment from "moment";
import userAPI from "../../../../api/userAPI";
import DatePicker from "react-datepicker";
import { storage } from "../../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

require("react-datepicker/dist/react-datepicker.css");

const UserInformation = () => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [showModalPhone, setShowModalPhone] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [startDate, setStartDate] = useState(
    !loggedInUser.user.birthday ? null : new Date(loggedInUser.user.birthday)
  );
  const [userName, setUserName] = useState(loggedInUser.user.userName);
  const [fullName, setFullName] = useState(loggedInUser.user.fullName);
  const [genderUser, setGenderUser] = useState(
    !loggedInUser.user.gender ? null : loggedInUser.user.gender
  );
  const [addressrUser, setAddressUser] = useState(loggedInUser.user.address);

  const changeCheckGender = () => {
    setGenderUser(!genderUser);
  };
  const handleUpdateUser = async () => {
    try {
      const updateUser = await userAPI.updateuser(
        {
          userName: userName,
          fullName: fullName,
          birthday: moment(startDate).format("YYYY-MM-DD"),
          gender: genderUser,
          address: addressrUser,
        },
        loggedInUser.accessToken
      );
      if (updateUser.success === true) {
        localStorage.setItem("user", JSON.stringify(updateUser.result));
        setTimeout(() => {
          window.location.reload(false);
        }, 1300);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadImage = async () => {
    document.getElementById("selectfile").click();
  };
  const fileSelected = (e) => {
    const imageRef = ref(storage, loggedInUser.user._id);
    uploadBytes(imageRef, e.target.files[0])
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            const updateUser = await userAPI.updateuser(
              {
                avatar: url,
              },
              loggedInUser.accessToken
            );
            if (updateUser.success === true) {
              localStorage.setItem("user", JSON.stringify(updateUser.result));
              setTimeout(() => {
                window.location.reload(false);
              }, 1300);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <formuser>
      <div
        style={{ background: "rgba(218, 218, 218, 0.5)" }}
        className="d-flex"
      >
        <ModalUpdatePhone
          show={showModalPhone}
          datauser={loggedInUser.user}
          onHide={() => {
            setShowModalPhone(false);
          }}
        />
        <ModalUpdateEmail
          show={showModalEmail}
          datauser={loggedInUser.user}
          onHide={() => {
            setShowModalEmail(false);
          }}
        />
        <ModalUpdatePassword
          show={showModalPassword}
          datauser={loggedInUser.user}
          onHide={() => setShowModalPassword(false)}
        />
        <user>
          <userleft>
            <ListGroup className="listgroup">
              <ListGroup.Item>
                <formitem>
                  <LocalPhoneOutlinedIcon fontSize="large" />
                  <formitemleft>
                    <p>Số điện thoại</p>
                    {loggedInUser.user.phone === "" ? (
                      <p>Chưa cập nhật</p>
                    ) : (
                      <p>{loggedInUser.user.phone}</p>
                    )}
                  </formitemleft>
                  <formitemright>
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowModalPhone(true)}
                    >
                      Cập nhật
                    </Button>
                  </formitemright>
                </formitem>
              </ListGroup.Item>
              <ListGroup.Item>
                <formitem>
                  <EmailOutlinedIcon fontSize="large" />
                  <formitemleft>
                    <p>Email</p>
                    {loggedInUser.user.email === "" ? (
                      <p>Chưa cập nhật</p>
                    ) : (
                      <p>{loggedInUser.user.email}</p>
                    )}
                  </formitemleft>
                  <formitemright>
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowModalEmail(true)}
                    >
                      Cập nhật
                    </Button>
                  </formitemright>
                </formitem>
              </ListGroup.Item>
              <ListGroup.Item>
                <formitem>
                  <VpnKeyOutlinedIcon fontSize="large" />
                  <formitemleft>
                    <p>Mật khẩu</p>
                    <p>*********</p>
                  </formitemleft>
                  <formitemright>
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowModalPassword(true)}
                    >
                      Cập nhật
                    </Button>
                  </formitemright>
                </formitem>
              </ListGroup.Item>
            </ListGroup>
          </userleft>
          <userright>
            <formprofile>
              <formavatar>
                <Avatar
                  alt="Avatar"
                  src={
                    !loggedInUser.user.avatar
                      ? require("../../../../images/TOYSKID.png")
                      : loggedInUser.user.avatar
                  }
                  sx={{
                    width: 200,
                    height: 200,
                    border: "4px solid rgba(165, 165, 165, 0.5)",
                  }}
                />
                <div className="buttona">
                  <Button variant="secondary" onClick={handleUploadImage}>
                    Thay đổi
                  </Button>
                  <input
                    type="file"
                    id="selectfile"
                    onChange={fileSelected}
                    accept="image/*"
                  />
                </div>
              </formavatar>
              <forminput>
                <p className="ttcn">Thông tin cá nhân</p>
                <div className="inputf">
                  <Form.Label>Tên người dùng:</Form.Label>
                  <Form.Control
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="inputf">
                  <Form.Label>Họ và tên:</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="inputf">
                  <Form.Label>Ngày sinh:</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={<Form.Control type="text" />}
                  ></DatePicker>
                </div>
                <div className="inputf">
                  <Form.Label>Giới tinh:</Form.Label>
                  <div className="d-flex flex-row">
                    <Form.Check
                      className="me-2"
                      type="radio"
                      aria-label="radio 1"
                      name="abc"
                      defaultChecked={
                        !loggedInUser.user.gender ? false : genderUser
                      }
                      onChange={changeCheckGender}
                    />
                    <p className="me-5">Nam</p>
                    <Form.Check
                      className="me-2"
                      type="radio"
                      aria-label="radio 1"
                      name="abc"
                      defaultChecked={
                        !loggedInUser.user.gender ? false : !genderUser
                      }
                      onChange={changeCheckGender}
                    />
                    <p>Nữ</p>
                  </div>
                </div>
                <div className="inputf">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    value={addressrUser}
                    onChange={(e) => setAddressUser(e.target.value)}
                  />
                </div>
                <div className="buttonl">
                  <Button variant="success" onClick={handleUpdateUser}>
                    Lưu thay đổi
                  </Button>
                </div>
              </forminput>
            </formprofile>
          </userright>
        </user>
      </div>
    </formuser>
  );
};

export default UserInformation;
