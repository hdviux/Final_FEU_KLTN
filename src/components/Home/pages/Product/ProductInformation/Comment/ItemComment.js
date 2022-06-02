import React, { useEffect, useState } from "react";
import moment from "moment";

import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import commentAPI from "../../../../../../api/commentAPI";
import { Link } from "@mui/material";
const ItemComment = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const isSignIn = JSON.parse(localStorage.getItem("user"));
  const [count, setCount] = useState(props.data.vote.length);
  const [textVote, setTextVote] = useState("");

  useEffect(() => {
    const action = async () => {
      try {
        if (isSignIn !== null) {
          const findComment = await commentAPI.findcommentbyid({
            commentID: props.data._id,
          });
          if (findComment.result.vote.includes(loggedInUser.user._id)) {
            setTextVote("Đã thích");
          } else {
            setTextVote("Thích");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    action();
  });

  const handleVote = async () => {
    try {
      await commentAPI.changevote(
        { commentID: props.data._id },
        loggedInUser.accessToken
      );
      const findComment = await commentAPI.findcommentbyid({
        commentID: props.data._id,
      });
      if (isSignIn !== null) {
        setCount(findComment.result.vote.length);
        if (findComment.result.vote.includes(loggedInUser.user._id)) {
          setTextVote("Đã thích");
        } else {
          setTextVote("Thích");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "100px",
        paddingRight: "100px",
      }}
    >
      <div style={{ borderBottom: "2px solid rgba(218, 218, 218, 0.5)" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            alt="Avatar"
            src={props.data.user.avatar}
            sx={{
              width: 50,
              height: 50,
              border: "1px solid rgba(165, 165, 165, 0.5)",
              marginRight: "10px",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "18px" }}>
              {props.data.user.userName}
            </strong>
            <Rate
              style={{ fontSize: "11px", color: "#ee4d2d" }}
              defaultValue={Number(props.data.star)}
              disabled={true}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            paddingLeft: "60px",
            marginBottom: "25px",
            marginTop: "10px",
          }}
        >
          <div>
            {moment(props.data.timeCreate).format("DD-MM-YYYY HH:mm a")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            marginBottom: "70px",
            paddingLeft: "60px",
            paddingRight: "60px",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: "18px" }}>{props.data.content}</div>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-start",
              marginTop: "20px",
              marginRight: "35px",
            }}
          >
            <Link
              underline="none"
              style={{ color: "1890ff" }}
              disabled={!isSignIn ? true : false}
              onClick={handleVote}
            >
              {textVote} ({count}){" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemComment;
