import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
const CarouselForm = () => {
  return (
    <Carousel variant="dark" className="carouselform">
      {[1, 2, 3, 4].map((data, index) => (
        <Carousel.Item key={index}>
          <div>
            <img
              src={require(`../../../images/${data}.jpg`)}
              style={{ width: "100%" }}
              alt=""
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselForm;
