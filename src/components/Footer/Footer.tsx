import { Box } from "@mui/material";
import React from "react";

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
        color: "#e2e8f0",
        height: "40px",
        backgroundColor: "#475569",
      }}
    >
      Javier Rostagno&copy;
    </Box>
  );
};

export default Footer;
