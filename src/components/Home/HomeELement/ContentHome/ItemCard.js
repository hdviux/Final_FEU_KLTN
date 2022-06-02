import React, { useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Card, Divider } from "antd";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import discountAPI from "../../../../api/discountAPI";
import { Typography, Space } from "antd";
import { color } from "@mui/system";
const ItemCard = (props) => {
  const { Text } = Typography;
  const { Meta } = Card;
  const [discount, setDiscount] = useState(false);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const action = async () => {
      const checkDiscount = await discountAPI.checkdiscount({
        productID: props.data._id,
      });
      if (checkDiscount.status === true) {
        const findDiscount = await discountAPI.finddiscount({
          productID: props.data._id,
        });
        setDiscount(findDiscount.result.percent);
      }
      if (checkDiscount.status === false) {
        setDiscount(0);
      }
    };
    action();
  }, []);
  return (
    <Badge
      count={
        discount === 0 ? (
          0
        ) : (
          <div
            style={{
              width: "60px",
              height: "40px",
              background: "#ff0000",
              alignItems: "center",
              display: "flex",
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              borderRadius: "15px",
            }}
          >
            - {discount}%
          </div>
        )
      }
    >
      <Card
        hoverable
        onClick={() => {
          navigate(`/product/${props.data._id}`, {
            state: {
              state: props.data,
              discount: discount,
            },
          });
          window.location.reload(false);
        }}
        style={{ width: 300 }}
        cover={<img alt="example" height={300} src={props.data.image[0]} />}
      >
        <Divider />
        <Meta
          title={<Rate disabled value={Number(props.data.avgEvaluate)} />}
          className="mb-3"
        />
        <Meta
          title={
            <h4
              style={{
                color: "#144c95",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.data.productName}
            </h4>
          }
          description={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "#ff4d4f", fontSize: 20 }}>
                {discount === 0 ? (
                  <div>{props.data.price}₫</div>
                ) : (
                  <div
                    style={{ display: "flex", flex: 1, flexDirection: "row" }}
                  >
                    <Text delete className="me-5">
                      <div>{props.data.price}₫</div>
                    </Text>
                    {props.data.price * ((100 - discount) / 100)}₫
                  </div>
                )}
              </div>
            </div>
          }
        />
      </Card>
    </Badge>
  );
};

export default ItemCard;
