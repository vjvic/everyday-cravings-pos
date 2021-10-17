import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Item from "../Item/Item";

const ItemCarousel = ({ dummyData, text }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    laptop: {
      breakpoint: { max: 1200, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    phone: {
      breakpoint: { max: 400, min: 300 },
      items: 1,
    },
  };

  return (
    <div>
      <Typography variant="h4">{text}</Typography>

      <Box py={3}>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "phone"]}
        >
          {dummyData.meals.map((item) => (
            <Box pr={2} py={2} key={item.idMeal}>
              <Item item={item} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default ItemCarousel;
