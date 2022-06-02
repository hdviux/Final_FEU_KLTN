import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Form, Input } from "antd";
import { Rate } from "antd";
import evaluateAPI from "../../../../api/evaluateAPI";
import commentAPI from "../../../../api/commentAPI";

const ModalCommentEvaluate = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [content, setContent] = useState("");
  const [star, setStar] = useState(null);
  const handleChange = async (value) => {
    try {
      setStar(value);
      if (value !== null) {
        if (value === 1) {
          await evaluateAPI.changestart(
            {
              evaluateID: props.getEvaluate._id,
              oneStar: "1",
              twoStar: "",
              threeStar: "",
              fourStar: "",
              fiveStar: "",
            },
            loggedInUser.accessToken
          );
        }
        if (value === 2) {
          await evaluateAPI.changestart(
            {
              evaluateID: props.getEvaluate._id,
              oneStar: "",
              twoStar: "2",
              threeStar: "",
              fourStar: "",
              fiveStar: "",
            },
            loggedInUser.accessToken
          );
        }
        if (value === 3) {
          await evaluateAPI.changestart(
            {
              evaluateID: props.getEvaluate._id,
              oneStar: "",
              twoStar: "",
              threeStar: "3",
              fourStar: "",
              fiveStar: "",
            },
            loggedInUser.accessToken
          );
        }
        if (value === 4) {
          await evaluateAPI.changestart(
            {
              evaluateID: props.getEvaluate._id,
              oneStar: "",
              twoStar: "",
              threeStar: "",
              fourStar: "4",
              fiveStar: "",
            },
            loggedInUser.accessToken
          );
        }
        if (value === 5) {
          await evaluateAPI.changestart(
            {
              evaluateID: props.getEvaluate._id,
              oneStar: "",
              twoStar: "",
              threeStar: "",
              fourStar: "",
              fiveStar: "5",
            },
            loggedInUser.accessToken
          );
        }
        if (value === 0) {
          if (props.checkEvaluate === 1) {
            await evaluateAPI.changestart(
              {
                evaluateID: props.getEvaluate._id,
                oneStar: "1",
                twoStar: "",
                threeStar: "",
                fourStar: "",
                fiveStar: "",
              },
              loggedInUser.accessToken
            );
          }
          if (props.checkEvaluate === 2) {
            await evaluateAPI.changestart(
              {
                evaluateID: props.getEvaluate._id,
                oneStar: "",
                twoStar: "2",
                threeStar: "",
                fourStar: "",
                fiveStar: "",
              },
              loggedInUser.accessToken
            );
          }
          if (props.checkEvaluate === 3) {
            await evaluateAPI.changestart(
              {
                evaluateID: props.getEvaluate._id,
                oneStar: "",
                twoStar: "",
                threeStar: "3",
                fourStar: "",
                fiveStar: "",
              },
              loggedInUser.accessToken
            );
          }
          if (props.checkEvaluate === 4) {
            await evaluateAPI.changestart(
              {
                evaluateID: props.getEvaluate._id,
                oneStar: "",
                twoStar: "",
                threeStar: "",
                fourStar: "4",
                fiveStar: "",
              },
              loggedInUser.accessToken
            );
          }
          if (props.checkEvaluate === 5) {
            await evaluateAPI.changestart(
              {
                evaluateID: props.getEvaluate._id,
                oneStar: "",
                twoStar: "",
                threeStar: "",
                fourStar: "",
                fiveStar: "5",
              },
              loggedInUser.accessToken
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEvaluate = async () => {
    try {
      if (star !== null) {
        await commentAPI.addcomment(
          {
            content: content,
            productID: props.data.productData._id,
            star: star,
          },
          loggedInUser.accessToken
        );
        localStorage.setItem("star", star);
      }
      if (star === null) {
        await commentAPI.addcomment(
          {
            content: content,
            productID: props.data.productData._id,
            star: props.checkEvaluate,
          },
          loggedInUser.accessToken
        );
        localStorage.setItem("star", props.checkEvaluate);
      }
      setContent("");
      // Swal.fire({
      //   title: "Bình luận thành công!",
      //   icon: "success",
      //   showConfirmButton: false,
      //   timer: 1000,
      // });

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(content);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Đánh giá/Bình luận
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            height: "400px",
            width: "100%",
            flexDirection: "row",
            display: "flex",
          }}
        >
          <div
            style={{
              height: "400px",
              width: "50%",
              borderRight: "1px solid rgba(218, 218, 218, 0.5)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              className="mt-5"
              height={200}
              src={require("../../../../images/feedback.png")}
              alt=""
            />
          </div>
          <div
            className="d-flex flex-column align-items-center"
            style={{ height: "400px", width: "50%" }}
          >
            <div style={{ width: "300px" }}>
              <Form.Item>
                <div>
                  <h5>Đánh giá:</h5>
                  <Rate
                    defaultValue={props.checkEvaluate}
                    onChange={handleChange}
                    className="mb-4"
                  />
                </div>
                <div>
                  <h5>Bình luận:</h5>{" "}
                  <Input.TextArea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                      display: "flex",
                      flex: 1,
                      height: "150px",
                      resize: "none",
                    }}
                    placeholder="Bình luận về sản phẩm"
                  />
                </div>
              </Form.Item>
            </div>
            <div className="d-flex flex-row align-items-center">
              <Button
                variant="secondary"
                className="me-2"
                style={{ width: "120px" }}
                onClick={props.onHide}
              >
                Hủy
              </Button>
              <Button
                variant="primary"
                className="ms-2"
                style={{ width: "120px" }}
                onClick={handleCommentEvaluate}
              >
                Hoàn tất
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCommentEvaluate;
