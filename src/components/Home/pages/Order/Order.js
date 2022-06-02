import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { useEffect } from "react";
import AllOrder from "./AllOrder";

const Order = (props) => {
  console.log(2, props.allOrder);
  console.log(3, props.allOrderRefund);
  console.log(4, props.allOrderPending);
  console.log(5, props.allOrderReceived);
  console.log(6, props.allOrderShipping);
  const [value, setValue] = useState("1");
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };
  // useEffect(() => {
  //   if(props.allOrde.length!==0){
  //     setTimeout(() => {
  //       setValue("2");
  //     }, 1000);
  //   }
  // }, [props.allOrde]);
  return (
    <TabContext value={value}>
      <Box>
        <TabList
          sx={{
            width: "650px",
            background: "white",
            borderRadius: "5px",
          }}
          onChange={handleChange}
          value={value}
        >
          {/* <Tab/> */}
          <Tab label="Tất cả" value="2" />
          <Tab label="Đã nhận" value="3" />
          <Tab label="Đang chờ xử lý" value="4" />
          <Tab label="Đang vận chuyển" value="5" />
          <Tab label="Đã hủy" value="6" />
        </TabList>
        <TabPanel value="1">
          <div style={{ display: "flex", flex: 1, height: "400px" }}></div>
        </TabPanel>
        <TabPanel value="2">
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "25px",
            }}
          >
            <AllOrder data={props.allOrder} />
          </Box>
        </TabPanel>
        <TabPanel value="3">
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "25px",
            }}
          >
            <AllOrder data={props.allOrderReceived} />
          </Box>
        </TabPanel>
        <TabPanel value="4">
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "25px",
            }}
          >
            <AllOrder data={props.allOrderPending} />
          </Box>
        </TabPanel>
        <TabPanel value="5">
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "25px",
            }}
          >
            <AllOrder data={props.allOrderShipping} />
          </Box>
        </TabPanel>
        <TabPanel value="6">
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "25px",
            }}
          >
            <AllOrder data={props.allOrderRefund} />
          </Box>
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default Order;
