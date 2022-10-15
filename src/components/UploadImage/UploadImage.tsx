/* eslint-disable @next/next/no-img-element */
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { FaHandPointDown } from "react-icons/fa";
import styles from "./UploadImage.module.css";

import { motion } from "framer-motion";
import { UploadImage } from "../../types/componets";

const UploadImage: React.FC<UploadImage> = ({
  handleOnChange,
  avatarRef,
  preview,
}) => {
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
          Upload your pic !
        </Typography>
        <FaHandPointDown color="#64748b" className={styles.thumbIcon} />
      </Box>

      <label htmlFor="datosImg">
        <input
          hidden
          onChange={handleOnChange}
          className="imgInput"
          type="file"
          id="datosImg"
        />
        <div
          id="avatar"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "100%",
            border: "1px",

            overflow: "hidden",
          }}
        >
          {preview ? (
            <div
              id="avatar"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "100%",
                border: "1px",
                overflow: "hidden",
              }}
            >
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
            </div>
          ) : (
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ ease: "easeOut", duration: 2 }}
            >
              <div
                id="avatar"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "100%",
                  border: "1px dashed  lightgrey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <AddIcon
                  sx={{
                    fontSize: "80px",
                    color: "lightgrey",
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </label>
    </Stack>
  );
};

export default UploadImage;
