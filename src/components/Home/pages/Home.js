import { Divider } from "antd";
import React from "react";
import CarouselForm from "../HomeELement/Carousel";
import Hot from "../HomeELement/ContentHome/Hot";
import Sale from "../HomeELement/ContentHome/Sale";
import Selling from "../HomeELement/ContentHome/Selling";

function Home() {
  return (
    <div>
      <CarouselForm />
      <Hot />
      <Divider />
      <Sale />

      {/* <Sale />
      <Divider />
      <Hot />
      <Divider />
      <Selling /> */}
    </div>
  );
}

export default Home;
