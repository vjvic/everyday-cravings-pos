import React from "react";
import { Box } from "@mui/system";
import { HeroSection /* , HeroTypography */ } from "./styles";
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
          <Typography
            components="h1"
            variant="h2"
            fontWeight="bold"
            sx={{ letterSpacing: 6, marginBottom: 1 }}
          >
            Everyday{" "}
          </Typography>

          <Typography
            components="span"
            variant="h3"
            fontWeight="bold"
            sx={{ color: "primary.main", letterSpacing: 6 }}
          >
            Cravings!
          </Typography>

          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "#fff",
                color: "primary.main",
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
