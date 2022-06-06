import axiosClient from "../config/axiosClient";

const productAPI = {
  getallproduct() {
    const url = "/product/getallproduct";
    return axiosClient.get(url);
  },
  findproductbycategoryid(data) {
    const url = "/product/findproductbycategoryid";
    return axiosClient.post(url, { categoryID: data.categoryID });
  },
  findproductbyid(data) {
    const url = "/product/findproductbyid";
    return axiosClient.post(url, { productID: data.productID });
  },
  findproduct(data) {
    const url = "/product/findproduct";
    return axiosClient.post(url, {
      preData: data.preData,
      type: data.type,
      age: data.age,
      brandID: data.brandID,
      categoryID: data.categoryID,
      fMoney: data.fMoney,
      tMoney: data.tMoney,
      productName: data.productName,
    });
  },
  getproducthot() {
    const url = "/product/getproducthot";
    return axiosClient.post(url);
  },
  getproductsamecategory(data) {
    const url = "/product/getproductsamecategory";
    return axiosClient.post(url, { categoryID: data.categoryID });
  },
};

export default productAPI;
