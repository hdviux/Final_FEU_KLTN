import axiosClient from "../config/axiosClient";

const userAPI = {
  finduserbyid(accessToken) {
    const url = "/user/finduserbyid";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  updateuser(data, accessToken) {
    const url = "/user/updateuser";
    console.log(data, accessToken);
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
  changepassword(data, accessToken) {
    const url = "/user/changepassword";
    return axiosClient.post(
      url,
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      { header: { Authorization: accessToken } }
    );
  },
  finduserbyidincomment(data) {
    const url = "/user/finduserbyidincomment";
    return axiosClient.post(url, { userID: data.userID });
  },
  finduserbynamechar(data, accessToken) {
    const url = "/user/finduserbynamechar";
    return axiosClient.post(
      url,
      { userName: data.userName },
      { header: { Authorization: accessToken } }
    );
  },
};

export default userAPI;
