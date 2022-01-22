import { styled } from "@mui/material";
/* import { Typography } from "@mui/material"; */

export const HeroSection = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  color: "#333",
  padding: theme.spacing(5, 6),
  marginBottom: theme.spacing(7),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "1.6rem",
    },
  },

  /*  img: {
    display: "none",
  },
 */
  /*  [theme.breakpoints.up("md")]: {
    fontSize: "3.4rem",
    padding: theme.spacing(5, 10),
    img: {
      display: "block",
    },
  }, */
}));
/* 
export const HeroTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "3.4rem",
  },
})); */
