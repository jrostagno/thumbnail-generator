/* eslint-disable @next/next/no-img-element */
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { FaHandPointDown } from "react-icons/fa";

import { motion } from "framer-motion";
import { UploadImage } from "../../types/components";
import { iconContent, imgContent } from "./styles";

const UploadImage: React.FC<UploadImage> = ({
  handleOnChange,
  avatarRef,
  preview,
}) => {
  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      easy: "easeOut",
    },
  };

  return (
    <Stack spacing={3} sx={{ alignItems: "center" }}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Typography
          variant="h3"
          fontFamily="Roboto"
          color="#64748b"
          fontSize="1.7rem"
          letterSpacing="0.01em"
          component="h3"
        >
          Upload your Pic !
        </Typography>
        <motion.span
          transition={bounceTransition}
          animate={{ y: ["30%", "-30%"] }}
        >
          <FaHandPointDown style={{ color: "#64748b", fontSize: "1.5rem" }} />
        </motion.span>
      </Box>

      <label style={{ cursor: "pointer" }} htmlFor="datosImg">
        <input
          accept="image/gif, image/jpeg, image/png"
          hidden
          onChange={handleOnChange}
          className="imgInput"
          type="file"
          id="datosImg"
        />

        {preview ? (
          <Box id="avatar" sx={imgContent}>
            <img
              ref={avatarRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={preview}
              alt="avatar"
            />
          </Box>
        ) : (
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <Box id="avatar" sx={iconContent}>
              <motion.div whileHover="hover">
                <AddIcon
                  sx={{
                    fontSize: "80px",
                    color: "lightgrey",
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>
        )}
      </label>
    </Stack>
  );
};

export default UploadImage;
