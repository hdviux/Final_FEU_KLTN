import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useState } from "react";
import brandAPI from "../../../../../api/brandAPI";
import categoryAPI from "../../../../../api/categoryAPI";

const ProductDetail = (props) => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState([]);
  useEffect(() => {
    const action = async () => {
      try {
        const arrL = [];
        for (
          let index = 0;
          index < props.data.description.split("-").length;
          index++
        ) {
          if (index > 0) {
            arrL.push(props.data.description.split("-")[index]);
          }
        }
        setDescription(arrL);
        const getBrandByID = await brandAPI.findbrandbyidproduct({
          brandID: props.data.brandID,
        });
        setBrand(getBrandByID.result);
        const getCategoryByID = await categoryAPI.findcategorybyid({
          _id: props.data.categoryID,
        });
        setCategory(getCategoryByID.result);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <div style={{ padding: "30px" }}>
          <div style={{ borderBottom: "2px solid rgba(218, 218, 218, 0.5)" }}>
            <h3>Giới thiệu</h3>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "30px",
            paddingRight: "30px",
            fontSize: "18px",
            paddingBottom: "30px",
          }}
        >
          <div>- Loại sản phẩm: {category.categoryName}</div>
          <div>
            - Thương hiệu: {brand.brandName} của {brand.nation}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <div style={{ padding: "30px" }}>
          <div style={{ borderBottom: "2px solid rgba(218, 218, 218, 0.5)" }}>
            <h3>Thông tin sản phẩm</h3>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "30px",
            paddingRight: "30px",
            fontSize: "18px",
            paddingBottom: "30px",
          }}
        >
          {description.map((data, index) => {
            return <div key={index}>- {data}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
