import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const PageError = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Result
        style={{ marginTop: "50px", marginBottom: "150px" }}
        status="404"
        title="Không tìm thấy trang"
        subTitle="Trang bạn đã truy cập không tồn tại"
        extra={
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="primary"
          >
            Trở về
          </Button>
        }
      />
    </div>
  );
};

export default PageError;
