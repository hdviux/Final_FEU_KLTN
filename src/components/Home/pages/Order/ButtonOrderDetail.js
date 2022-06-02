import React, { useState, useEffect } from "react";
import ModalCommentEvaluate from "./ModalCommentEvaluate";
import Button from "react-bootstrap/Button";
import evaluateAPI from "../../../../api/evaluateAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ButtonOrderDetail = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [showModal, setShowModal] = useState(false);
  const [dataOne, setDataOne] = useState("");
  const [checkEvaluate, setCheckEvaluate] = useState("");
  const [getEvaluate, setGetEvaluate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const action = async () => {
      try {
        const getEvaluate = await evaluateAPI.findevaluatebyproductid({
          productID: JSON.parse(localStorage.getItem("itemorder"))._id,
        });
        setGetEvaluate(getEvaluate.result);
        const checkEvaluate = await evaluateAPI.checkisevaluated(
          { evaluateID: getEvaluate.result._id },
          loggedInUser.accessToken
        );
        setCheckEvaluate(checkEvaluate.result);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, [localStorage.getItem("itemorder")]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ModalCommentEvaluate
        show={showModal}
        data={dataOne}
        getEvaluate={getEvaluate}
        checkEvaluate={checkEvaluate}
        onHide={() => {
          setShowModal(false);
        }}
      />
      {props.items.orderStatus === "received" ? (
        <Button
          variant="danger"
          style={{ width: "150px", marginBottom: "10px" }}
          onClick={() => {
            setShowModal(true);
            setDataOne(props.rowKey);
            localStorage.setItem(
              "itemorder",
              JSON.stringify(props.rowKey.productData)
            );
          }}
        >
          Đánh giá
        </Button>
      ) : null}
    </div>
  );
};
export default ButtonOrderDetail;
