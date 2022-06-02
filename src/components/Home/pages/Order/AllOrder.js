import React, { useEffect, useState } from "react";
import { Empty, Spin, Table } from "antd";
import OrderDetails from "./OrderDetails";
import moment from "moment";
import orderAPI from "../../../../api/orderAPI";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { DatePicker } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

const AllOrder = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const action = async () => {
      try {
        const arr = [];
        for (let index = 0; index < props.data.length; index++) {
          const getAllOrderDetails = await orderAPI.getallorderdetailbyorderid(
            { orderID: props.data[index]._id },
            loggedInUser.accessToken
          );
          arr.push({
            key: props.data[index]._id,
            _id: props.data[index]._id,
            orderStatus:
              props.data[index].orderStatus === "pending"
                ? "Đang chờ xử lý"
                : props.data[index].orderStatus === "shipping"
                ? "Đang vận chuyển"
                : props.data[index].orderStatus === "refund"
                ? "Đã hủy"
                : props.data[index].orderStatus === "received"
                ? "Đã nhận"
                : null,
            dateCreated: props.data[index].dateCreated,
            countProduct: getAllOrderDetails.result.length,
            totalMoney: props.data[index].totalMoney,
            description: (
              <div>
                <OrderDetails
                  data={props.data[index]._id}
                  items={props.data[index]}
                />
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    marginRight: "50px",
                  }}
                >
                  {props.data[index].orderStatus === "shipping" ? (
                    <Button
                      variant="danger"
                      style={{ width: "250px", marginBottom: "10px" }}
                      onClick={async () => {
                        try {
                          await orderAPI.updateorderstatus(
                            {
                              orderID: props.data[index]._id,
                              orderStatus: "received",
                            },
                            loggedInUser.accessToken
                          );
                          window.location.reload(false);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Xác nhận đã nhận hàng
                    </Button>
                  ) : props.data[index].orderStatus === "pending" ? (
                    <Button
                      variant="danger"
                      style={{ width: "250px", marginBottom: "10px" }}
                      onClick={async () => {
                        try {
                          await orderAPI.updateorderstatus(
                            {
                              orderID: props.data[index]._id,
                              orderStatus: "refund",
                            },
                            loggedInUser.accessToken
                          );
                          window.location.reload(false);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Hủy đơn hàng
                    </Button>
                  ) : null}
                </div>
              </div>
            ),
          });
        }
        setData(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tình trạng",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Ngày lập",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (text) => <div> {moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "countProduct",
      key: "countProduct",
    },
    {
      title: "Đơn giá",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
  ];
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleChangeDebut = (range) => {
    const valueOfInput1 = range[0].format();
    const valueOfInput2 = range[1].format();
    setStartDate(new Date(valueOfInput1));
    setEndDate(new Date(valueOfInput2));
  };
  const onSearch = async () => {
    if (startDate === "" || endDate === "") {
      // Swal.fire({
      //   title: "Chưa chọn ngày!",
      //   icon: "warning",
      //   showConfirmButton: false,
      //   timer: 1000,
      // });
    }
    if (startDate !== "" || endDate !== "") {
      setLoading(true);
      const arr = [];
      for (let index = 0; index < data.length; index++) {
        const timeSend = new Date(data[index].dateCreated);
        if (
          timeSend.getTime() < endDate.getTime() &&
          timeSend.getTime() > startDate.getTime()
        ) {
          arr.push({
            key: data[index].key,
            _id: data[index]._id,
            orderStatus:
              data[index].orderStatus === "pending"
                ? "Đang chờ xử lý"
                : data[index].orderStatus === "shipping"
                ? "Đang vận chuyển"
                : data[index].orderStatus === "refund"
                ? "Đã hủy"
                : data[index].orderStatus === "received"
                ? "Đã nhận"
                : null,
            dateCreated: data[index].dateCreated,
            countProduct: data[index].countProduct,
            totalMoney: data[index].totalMoney,
            description: (
              <div>
                <OrderDetails data={data[index]._id} items={data[index]} />
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    marginRight: "50px",
                  }}
                >
                  {data[index].orderStatus === "shipping" ? (
                    <Button
                      variant="danger"
                      style={{ width: "250px", marginBottom: "10px" }}
                      onClick={async () => {
                        try {
                          await orderAPI.updateorderstatus(
                            {
                              orderID: data[index]._id,
                              orderStatus: "received",
                            },
                            loggedInUser.accessToken
                          );
                          window.location.reload(false);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Xác nhận đã nhận hàng
                    </Button>
                  ) : data[index].orderStatus === "pending" ? (
                    <Button
                      variant="danger"
                      style={{ width: "250px", marginBottom: "10px" }}
                      onClick={async () => {
                        try {
                          await orderAPI.updateorderstatus(
                            {
                              orderID: data[index]._id,
                              orderStatus: "refund",
                            },
                            loggedInUser.accessToken
                          );
                          window.location.reload(false);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Hủy đơn hàng
                    </Button>
                  ) : null}
                </div>
              </div>
            ),
          });
        }
      }

      setData(arr);
      setLoading(false);
    }
  };
  const resetData = async () => {
    try {
      setLoading(true);
      const arr = [];
      for (let index = 0; index < props.data.length; index++) {
        const getAllOrderDetails = await orderAPI.getallorderdetailbyorderid(
          { orderID: props.data[index]._id },
          loggedInUser.accessToken
        );
        arr.push({
          key: props.data[index]._id,
          _id: props.data[index]._id,
          orderStatus:
            props.data[index].orderStatus === "pending"
              ? "Đang chờ xử lý"
              : props.data[index].orderStatus === "shipping"
              ? "Đang vận chuyển"
              : props.data[index].orderStatus === "refund"
              ? "Đã hủy"
              : props.data[index].orderStatus === "received"
              ? "Đã nhận"
              : null,
          dateCreated: props.data[index].dateCreated,
          countProduct: getAllOrderDetails.result.length,
          totalMoney: props.data[index].totalMoney,
          description: (
            <div>
              <OrderDetails
                data={props.data[index]._id}
                items={props.data[index]}
              />
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  marginRight: "50px",
                }}
              >
                {props.data[index].orderStatus === "shipping" ? (
                  <Button
                    variant="danger"
                    style={{ width: "250px", marginBottom: "10px" }}
                    onClick={async () => {
                      try {
                        await orderAPI.updateorderstatus(
                          {
                            orderID: props.data[index]._id,
                            orderStatus: "received",
                          },
                          loggedInUser.accessToken
                        );
                        window.location.reload(false);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Xác nhận đã nhận hàng
                  </Button>
                ) : props.data[index].orderStatus === "pending" ? (
                  <Button
                    variant="danger"
                    style={{ width: "250px", marginBottom: "10px" }}
                    onClick={async () => {
                      try {
                        await orderAPI.updateorderstatus(
                          {
                            orderID: props.data[index]._id,
                            orderStatus: "refund",
                          },
                          loggedInUser.accessToken
                        );
                        window.location.reload(false);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Hủy đơn hàng
                  </Button>
                ) : null}
              </div>
            </div>
          ),
        });
      }
      setData(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <RangePicker
        onChange={handleChangeDebut}
        placeholder={["Từ ngày", "Đến ngày"]}
        format="DD-MM-YYYY"
        clearIcon={<SyncOutlined onMouseDown={resetData} />}
      />
      <Button type="primary" style={{ marginLeft: "20px" }} onClick={onSearch}>
        Tìm kiếm
      </Button>
      {loading === true ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 55,
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
          }}
          dataSource={data}
          locale={{
            emptyText: <Empty description={false} />,
          }}
        />
      )}
    </div>
  );
};
export default AllOrder;
