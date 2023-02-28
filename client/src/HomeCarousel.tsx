import React from "react";
import { Carousel } from "react-bootstrap";

function HomeCarousel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/carousel/Slow-fashion-2.jpg"
            alt="slow fashion"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/carousel/Slow-fashion-3.jpg"
            alt="stay cool"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/carousel/Slow-fashion-7.jpg"
            alt="buy less"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/carousel/Slow-fashion-8.jpg"
            alt="choose well"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
