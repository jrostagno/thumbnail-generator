import { IconButton, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import React from "react";
import { FaDownload } from "react-icons/fa";
import { generateLink, saveImage } from "../../../services/helpers";
import { Box } from "@mui/system";
import { ActionButton } from "../../types/components";

const ActionButtons: React.FC<ActionButton> = ({ image, avatarRef }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        color: "primary",
      }}
    >
      <Tooltip title="Download!">
        <IconButton
          onClick={() => {
            saveImage(image.filter, image.width, image.height, avatarRef);

            toast.success("Download Succes!", {
              style: {
                border: "1px solid #14b8a6",
                padding: "16px",
                color: "#14b8a6",
              },
              iconTheme: {
                primary: "#14b8a6",
                secondary: "#FFFAEE",
              },
            });
          }}
        >
          <FaDownload style={{ color: "#14b8a6" }} />
        </IconButton>
      </Tooltip>
      <CopyToClipboard
        text={generateLink(image.filter, image.width, image.height, avatarRef)}
      >
        <Tooltip title="Copy URL !">
          <IconButton
            onClick={() =>
              toast.success("Copy Succes!", {
                style: {
                  border: "1px solid #14b8a6",
                  padding: "16px",
                  color: "#14b8a6",
                },
                iconTheme: {
                  primary: "#14b8a6",
                  secondary: "#FFFAEE",
                },
              })
            }
          >
            <MdContentCopy style={{ color: "#14b8a6" }} />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>
    </Box>
  );
};

export default ActionButtons;
