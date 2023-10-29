import React from "react";
import Carousel from "./Carousel/carouselcomplete";
import FeaturedAlbums from "./Main/FeaturedAlbums";
import NewReleases from "./Main/NewReleases";
import Heading from "./Main/Heading";
import TestimonialsCarousel from "./Testimonials/testimonialsCarousel";

export default function home() {
  return (
    <>
      <div className="">
        <div className="pt-[3rem]">
          <Heading />
          <Carousel />
          <NewReleases />
          <FeaturedAlbums />
          <TestimonialsCarousel />
        </div>
      </div>
    </>
  );
}
