import React, { useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rate } from "antd";
import commentAPI from "../../../../../../api/commentAPI";
import userAPI from "../../../../../../api/userAPI";
import { useState } from "react";
import { Pagination } from "antd";
import ItemComment from "./ItemComment";
const Comment = (props) => {
  const [getAllComment, setGetAllComment] = useState([]);
  const [number, setNumber] = useState(1);
  const postsPerPage = 4;

  useLayoutEffect(() => {
    const action = async () => {
      try {
        let arr = [];
        const getAllComment = await commentAPI.getallcommentproduct({
          productID: props.data._id,
        });
        for (let index = 0; index < getAllComment.result.length; index++) {
          const getUserByID = await userAPI.finduserbyidincomment({
            userID: getAllComment.result[index].userID,
          });
          arr.push({
            _id: getAllComment.result[index]._id,
            content: getAllComment.result[index].content,
            timeCreate: getAllComment.result[index].timeCreate,
            vote: getAllComment.result[index].vote,
            star: getAllComment.result[index].star,
            userID: getAllComment.result[index].userID,
            productID: getAllComment.result[index].productID,
            user: getUserByID.result,
          });
        }
        setGetAllComment(arr);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const handlePage = (pageNumber) => setNumber(pageNumber);
  let newData = getAllComment.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );
  console.log(13, getAllComment);
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          borderBottom: "2px solid rgba(218, 218, 218, 0.5)",
          marginLeft: 20,
          justifyContent: "left",
          padding: "50px",
        }}
      >
        <div style={{ height: "auto" }}>
          <strong style={{ fontSize: "25px", color: "#ee4d2d" }}>
            {props.getEvaluate.avgEvaluate}/5
          </strong>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Rate
              style={{ fontSize: "35px", color: "#ee4d2d" }}
              allowHalf
              value={Number(props.getEvaluate.avgEvaluate)}
              disabled={true}
            />
            <div>{props.getEvaluate.totalCount} đánh giá</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <div style={{ padding: "30px" }}>
          <div style={{ borderBottom: "2px solid rgba(218, 218, 218, 0.5)" }}>
            <h3>Đánh giá sản phẩm ({getAllComment.length} Bình luận)</h3>
          </div>
        </div>
        {newData.map((data, index) => {
          return <ItemComment key={index} data={data} />;
        })}
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            height: "150px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {getAllComment.length === 0 ? null : (
            <Pagination
              style={{ fontSize: "18px" }}
              total={getAllComment.length}
              defaultCurrent={number}
              showSizeChanger={false}
              pageSize={postsPerPage}
              onChange={handlePage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
