import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { LabelError } from "../../types/components";

const LabelError: FC<LabelError> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography color="error.main" fontFamily="monospace" fontSize="2rem">
        {children}
      </Typography>
    </motion.div>
  );
};

export default LabelError;
