import React, { useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../../Styles/SearchProduct.scss";
import SearchLeft from "./Element/SearchLeft";
import SearchRight from "./Element/SearchRight";
import { useLocation } from "react-router-dom";
export const AppContext = createContext(null);
const SearchProduct = (props) => {
  const location = useLocation();
  const [prevData, setPrevData] = useState([]);

  return (
    <AppContext.Provider value={{ prevData, setPrevData }}>
      <div className="searchcontainer">
        <SearchLeft
          allCategory={props.allCategory}
          allBrand={props.allBrand}
          allAge={props.allAge}
          search={location.state}
        />
        <SearchRight />
      </div>
    </AppContext.Provider>
  );
};

export default SearchProduct;
