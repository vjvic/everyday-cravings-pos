import React from "react";
import { Box } from "@mui/system";
import { HeroSection, HeroBtn, HeroTypography } from "./styles";

const Hero = () => {
  return (
    <HeroSection>
      <div>
        <HeroTypography components="h1" fontWeight="bold">
          We’re always in the mood for food
        </HeroTypography>
        <Box py={5}>
          <HeroBtn variant="contained">Book a Table</HeroBtn>
          <HeroBtn variant="outlined">Menu</HeroBtn>
        </Box>
      </div>
    </HeroSection>
  );
};

export default Hero;
