import React from "react";
import { Carousel } from "react-bootstrap";

import "./styles.css";

export default function ImgSlider(){
  return (
    <Carousel className="carouselEl">
      <Carousel.Item>
        <img
        className="d-block w-100"
        src="https://image.freepik.com/free-photo/dark-blue-product-background_53876-89503.jpg"
        alt="First slide"
      />
        <Carousel.Caption className="carouselCaptionEl">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
        className="d-block w-100"
        src="https://media.istockphoto.com/photos/dark-grey-black-slate-texture-in-natural-pattern-with-high-resolution-picture-id1028280520?k=6&m=1028280520&s=612x612&w=0&h=rmA25EHm-9M20YnTgTJtuixlCphAwguF377xrZhsneI="
        alt="Third slide"
      />
        <Carousel.Caption className="carouselCaptionEl">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        className="d-block w-100"
        src="https://livenationproductions.com/wp-content/uploads/2018/04/483361-vertical-background-dark-2560x1600-for-xiaomi.jpg"
        alt="Third slide"
      />
        <Carousel.Caption className="carouselCaptionEl">
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel> 
  )
}
