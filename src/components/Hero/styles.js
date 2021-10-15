import { styled } from "@mui/material";
import hero from "assets/image/hero-bg.jpg";
import { Button, Typography } from "@mui/material";

export const HeroSection = styled("section")(({ theme }) => ({
  background: `url(${hero}) no-repeat center center / cover`,
  minHeight: 500,
  borderRadius: "10px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#fff",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(7),

  [theme.breakpoints.down("md")]: {
    minHeight: 270,
  },

  " > *": {
    zIndex: 1,
  },

  "&:before": {
    content: '" "',
    borderRadius: theme.shape.borderRadius,
    background: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
  },
}));

export const HeroBtn = styled(Button)(({ theme }) => ({
  height: "50px",
  width: "140px",
  margin: theme.spacing(1),

  [theme.breakpoints.up("md")]: {
    height: "60px",
    width: "160px",
  },
}));

export const HeroTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "3.4rem",
  },
}));
