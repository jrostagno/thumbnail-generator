import { Button } from "@mui/material";
import React from "react";
import { ButtonPrimary } from "../../types/components";

const ButtonPrimary: React.FC<ButtonPrimary> = ({ children, ...props }) => {
  return (
    <Button color="primary" variant="outlined" {...props}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;
