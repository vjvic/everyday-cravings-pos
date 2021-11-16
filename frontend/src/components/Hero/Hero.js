import React from "react";
import { Box } from "@mui/system";
import { HeroSection, HeroTypography } from "./styles";
import { Button, Grid, Typography } from "@mui/material";
/* import heroSvg from "assets/image/hero.svg"; */

const Hero = () => {
  return (
    <HeroSection>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ gridGap: 4 }}
      >
        <Grid item>
          <HeroTypography components="h1" fontWeight="bold">
            Everyday{" "}
            <Typography
              components="span"
              variant="h3"
              fontWeight="bold"
              sx={{ color: "#DE8538" }}
            >
              Cravings!
            </Typography>
          </HeroTypography>

          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "#fff",
                color: "#DE8538",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "#fff",
                },
              }}
            >
              More Info
            </Button>
          </Box>
        </Grid>
        {/*  <Grid item sm={3}>
          <img src={heroSvg} alt="hero svg" width="100%" />
        </Grid> */}
      </Grid>
    </HeroSection>
  );
};

export default Hero;
