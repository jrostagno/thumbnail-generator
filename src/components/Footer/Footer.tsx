import { Box } from "@mui/material";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        height: "70px",
        backgroundColor: "gray",
      }}
    >
      Javier Rostagno
    </Box>
  );
};

export default Footer;
