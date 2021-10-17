import React from "react";
import { Box } from "@mui/system";
import { HeroSection, HeroTypography } from "./styles";
import { Button, Grid, Typography } from "@mui/material";
import heroSvg from "assets/image/hero.svg";

const Hero = () => {
  return (
    <HeroSection>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ gridGap: 4 }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <HeroTypography components="h1" fontWeight="bold">
            Free Delivery for 30 days 🎉
          </HeroTypography>
          <Typography components="p" variant="h6" fontWeight="bold">
            Free Delivery for orders over 500 pesos for 30 days
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "#fff",
                color: "#ff7043",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "#fff",
                },
              }}
            >
              More Info
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <img src={heroSvg} alt="hero svg" width="100%" />
        </Grid>
      </Grid>
    </HeroSection>
  );
};

export default Hero;
