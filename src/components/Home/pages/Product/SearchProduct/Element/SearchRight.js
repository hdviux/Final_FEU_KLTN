import React, { useContext, useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../../../Styles/SearchProduct.scss";
import ItemCard from "../../../../HomeELement/ContentHome/ItemCard";
import { AppContext } from "../SearchProduct";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Link } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import evaluateAPI from "../../../../../../api/evaluateAPI";
const SearchRight = () => {
  const { prevData } = useContext(AppContext);
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const action = async () => {
      const arr = [];
      for (let index = 0; index < prevData.length; index++) {
        const getEvaluate = await evaluateAPI.findevaluatebyproductid({
          productID: prevData[index]._id,
        });
        arr.push({
          _id: prevData[index]._id,
          productName: prevData[index].productName,
          image: prevData[index].image,
          quantity: prevData[index].quantity,
          price: prevData[index].price,
          description: prevData[index].description,
          categoryID: prevData[index].categoryID,
          brandID: prevData[index].brandID,
          age: prevData[index].age,
          avgEvaluate: getEvaluate.result.avgEvaluate,
          totalCount: getEvaluate.result.totalCount,
        });
      }
      setData(arr);
    };
    action();
  }, [prevData]);
  const sortUp = () => {
    const myData = [].concat(data).sort((a, b) => (a.price > b.price ? 1 : -1));
    setData(myData);
  };
  const sortDown = () => {
    const myData = [].concat(data).sort((a, b) => (a.price < b.price ? 1 : -1));
    setData(myData);
  };

  const sortStar = () => {
    const myData = []
      .concat(data)
      .sort((a, b) => (a.avgEvaluate < b.avgEvaluate ? 1 : -1));
    setData(myData);
  };

  return (
    <div className="rightcon">
      <div className="arange">
        Sắp xếp theo: &nbsp;&nbsp;
        <Link underline="none" onClick={sortUp}>
          <ArrowUpwardIcon /> Tăng dần theo giá
        </Link>
        &nbsp;&nbsp;
        <Link underline="none" onClick={sortDown}>
          <ArrowDownwardIcon /> Giảm dần theo giá
        </Link>
        &nbsp;&nbsp;
        <Link underline="none" onClick={sortStar}>
          <StarRoundedIcon /> Nổi bật
        </Link>
      </div>
      <div className="rightcontainer">
        {data.map((data, index) => {
          return (
            <div key={index} className="ms-4 me-2 mb-5">
              <ItemCard data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchRight;
