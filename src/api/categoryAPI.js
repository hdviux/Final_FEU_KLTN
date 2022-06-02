import axiosClient from "../config/axiosClient";

const categoryAPI = {
  getallcategory() {
    const url = "/category/getallcategory";
    return axiosClient.get(url);
  },
  findcategorybyname(data) {
    const url = "/category/findcategorybyname";
    return axiosClient.post(url, { categoryName: data.categoryName });
  },
  findcategorybyid(data) {
    const url = "/category/findcategorybyid";
    return axiosClient.post(url, { categoryID: data._id });
  },
  topcategory() {
    const url = "/category/topcategory";
    return axiosClient.post(url);
  },
};

export default categoryAPI;
