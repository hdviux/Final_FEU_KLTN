import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tag, Button, Space } from "antd";
import "../../../../../../Styles/SearchProduct.scss";
import { Radio } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import productAPI from "../../../../../../api/productAPI";
import { AppContext } from "../SearchProduct";
import evaluateAPI from "../../../../../../api/evaluateAPI";
import discountAPI from "../../../../../../api/discountAPI";
const SearchLeft = (props) => {
  const { setPrevData } = useContext(AppContext);
  const [valueAge, setValueAge] = useState(null);
  const [valueCategory, setValueCategory] = useState(null);
  const [valueBrand, setValueBrand] = useState(null);
  const [valueName, setValueName] = useState(null);
  const [preData, setPreData] = useState([]);
  const [disAge, setDisAge] = useState(false);
  const [disCate, setDisCate] = useState(false);
  const [disBrand, setDisBrand] = useState(false);
  const [disName, setDisName] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (preData.length === 0) {
        const getAllProduct = await productAPI.getallproduct();
        if (
          props.search.search === null &&
          props.search.category === null &&
          props.search.brand === null &&
          props.search.age !== null
        ) {
          const result = await productAPI.findproduct({
            preData: getAllProduct.result,
            type: "age",
            age: props.search.age,
          });
          setPreData(result.result);
          setPrevData(result.result);
        }
        if (
          props.search.search !== null &&
          props.search.category === null &&
          props.search.brand === null &&
          props.search.age === null
        ) {
          const result = await productAPI.findproduct({
            preData: getAllProduct.result,
            type: "name",
            productName: props.search.search,
          });
          setPreData(result.result);
          setPrevData(result.result);
        }

        if (
          props.search.search === null &&
          props.search.category !== null &&
          props.search.brand === null &&
          props.search.age === null
        ) {
          const result = await productAPI.findproduct({
            preData: getAllProduct.result,
            type: "category",
            categoryID: props.search.category,
          });
          setPreData(result.result);
          setPrevData(result.result);
        }

        if (
          props.search.search === null &&
          props.search.category === null &&
          props.search.brand !== null &&
          props.search.age === null
        ) {
          const result = await productAPI.findproduct({
            preData: getAllProduct.result,
            type: "brand",
            brandID: props.search.brand,
          });
          setPreData(result.result);
          setPrevData(result.result);
        }

        if (props.search.type === "hot") {
          const prevData = await productAPI.getallproduct();
          const myData = []
            .concat(prevData.result)
            .sort((a, b) => (a.avgEvaluate < b.avgEvaluate ? 1 : -1));
          setPreData(myData);
          setPrevData(myData);
        }
        if (props.search.type === "sale") {
          const prevData = await discountAPI.findproductdiscount();
          const myData = []
            .concat(prevData.result)
            .sort((a, b) => (a.avgEvaluate < b.avgEvaluate ? 1 : -1));
          setPreData(myData);
          setPrevData(myData);
        }
      }
      setDisName(true);
    };
    handleSearch();
  }, []);

  const onChangeAge = async (e) => {
    setValueAge(e.target.value);
    if (preData.length === 0) {
      const getAllProduct = await productAPI.getallproduct();
      const result = await productAPI.findproduct({
        preData: getAllProduct.result,
        type: "age",
        age: e.target.value,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    if (preData.length !== 0) {
      const result = await productAPI.findproduct({
        preData: preData,
        type: "age",
        age: e.target.value,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    setDisAge(true);
  };
  const onChangeCategory = async (e) => {
    setValueCategory(e.target.value);
    if (preData.length === 0) {
      const getAllProduct = await productAPI.getallproduct();
      const result = await productAPI.findproduct({
        preData: getAllProduct.result,
        type: "category",
        categoryID: e.target.value._id,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    if (preData.length !== 0) {
      const result = await productAPI.findproduct({
        preData: preData,
        type: "category",
        categoryID: e.target.value._id,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    setDisCate(true);
  };
  const onChangeBrand = async (e) => {
    setValueBrand(e.target.value);
    if (preData.length === 0) {
      const getAllProduct = await productAPI.getallproduct();
      const result = await productAPI.findproduct({
        preData: getAllProduct.result,
        type: "brand",
        brandID: e.target.value._id,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    if (preData.length !== 0) {
      const result = await productAPI.findproduct({
        preData: preData,
        type: "brand",
        brandID: e.target.value._id,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    setDisBrand(true);
  };

  const handleSearch = async () => {
    if (preData.length === 0) {
      const getAllProduct = await productAPI.getallproduct();
      const result = await productAPI.findproduct({
        preData: getAllProduct.result,
        type: "name",
        productName: valueName,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    if (preData.length !== 0) {
      const result = await productAPI.findproduct({
        preData: preData,
        type: "name",
        productName: valueName,
      });
      setPreData(result.result);
      setPrevData(result.result);
    }
    setDisName(true);
  };

  const refresh = async () => {
    setValueAge(null);
    setValueCategory(null);
    setValueBrand(null);
    setValueName("");
    setDisAge(false);
    setDisCate(false);
    setDisBrand(false);
    setDisName(false);
    const getAllProduct = await productAPI.getallproduct();
    setPreData(getAllProduct.result);
    setPrevData(getAllProduct.result);
  };

  return (
    <div className="leftcontainer">
      <div>
        <div className="searchre">
          <input
            className="divsearch"
            value={valueName}
            onChange={(e) => setValueName(e.target.value)}
            disabled={disName}
          />
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            disabled={disName}
          />
          <Button shape="circle" icon={<ReloadOutlined />} onClick={refresh} />
        </div>
      </div>
      <div className="tagchoi"></div>
      {/* <div className="contenttit">
        <h4>Giá tiền</h4>
      </div>
      <div className="contentchoi">
        <div>
          <h6>Từ</h6> <input />
        </div>
        <div>
          <h6>Đến</h6> <input />
        </div>
      </div> */}
      <div className="contenttit">
        <h4>Độ tuổi</h4>
      </div>
      <div className="contentchoi">
        <Radio.Group onChange={onChangeAge} value={valueAge}>
          <Space direction="vertical">
            {props.allAge.map((data, index) => {
              return (
                <div className="divradio" key={index}>
                  <Radio disabled={disAge} value={data}>
                    <div className="divradiocontent">
                      <h6>{data}</h6>
                    </div>
                  </Radio>
                </div>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
      <div className="contenttit">
        <h4>Loại sản phẩm</h4>
      </div>
      <div className="contentchoi">
        <Radio.Group onChange={onChangeCategory} value={valueCategory}>
          <Space direction="vertical">
            {props.allCategory.map((data, index) => {
              return (
                <div className="divradio" key={index}>
                  <Radio disabled={disCate} value={data}>
                    <div className="divradiocontent">
                      <h6>{data.categoryName}</h6>
                    </div>
                  </Radio>
                </div>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
      <div className="contenttit">
        <h4>Thương hiệu</h4>
      </div>
      <div className="contentchoi">
        <Radio.Group onChange={onChangeBrand} value={valueBrand}>
          <Space direction="vertical">
            {props.allBrand.map((data, index) => {
              return (
                <div className="divradio" key={index}>
                  <Radio disabled={disBrand} value={data}>
                    <div className="divradiocontent">
                      <h6>{data.brandName}</h6>
                    </div>
                  </Radio>
                </div>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default SearchLeft;
