import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC } from "react";
import { Layout } from "../../types/components";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Layout: FC<Layout> = ({ children, session }) => {
  return (
    <Box>
      <Head>
        <title>ThmubNail Generator</title>
      </Head>

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavBar session={session} />
        <Box sx={{ flexGrow: 1, marginTop: "60px" }} component="main">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
