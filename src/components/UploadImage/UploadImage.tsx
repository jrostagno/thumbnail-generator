/* eslint-disable @next/next/no-img-element */
import React, { useState, FormEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import { Box, DialogActions, Slider, Typography, Button } from "@mui/material";
import { FaHandPointDown } from "react-icons/fa";
import Croper from "react-easy-crop";
import { Dialog, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import { UploadImage } from "../../types/components";
import { Point, Area } from "react-easy-crop/types";
import { iconContent, imgContent } from "./styles";
import getCroppedImg from "../Croper/cropimages";
import { getImages } from "../../../services/api";
import LabelError from "../Error/LabelError";

const UploadImage: React.FC<UploadImage> = ({
  avatarRef,
  setImages,
  setIsLoading,
  setShowButton,
  setPhotoURL,
  photoURL,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleOnChange = async (event: FormEvent<HTMLInputElement>) => {
    reset();

    const image = event.currentTarget.files?.length
      ? event.currentTarget.files[0]
      : null;

    if (Number(image?.size) > 2000000) {
      setError(true);
      setPreview("");
      setImages([]);
      setIsLoading(false);
    } else {
      const reader = new FileReader();
      image && reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setPhotoURL(reader.result as string);
      };
      setOpen(true);
      event.currentTarget.value = "";
    }
  };

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    const { url }: any = await getCroppedImg(photoURL, croppedAreaPixels);
    setPreview(url);
    setPhotoURL(url);
    setOpen(false);
    getThumbnails();
  };

  const getThumbnails = () => {
    if (!error) {
      setIsLoading(true);
      setTimeout(() => {
        getImages().then((res) => setImages(res.data));
        setIsLoading(false);
        setShowButton(true);
      }, 3000);
    }
  };

  const reset = () => {
    setPhotoURL("");
    setImages([]);
    setPreview("");
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setError(false);
    setShowButton(false);
  };

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
      <Dialog open={open}>
        <DialogContent
          dividers
          sx={{
            background: "#333",
            position: "relative",
            height: 400,
            width: "auto",
            minWidth: { sm: 500 },
          }}
        >
          <Croper
            aspect={1}
            crop={crop}
            image={photoURL}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
            onZoomChange={setZoom}
          />
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
          <Box sx={{ width: "100%", mb: 1 }}>
            <Box>
              <Typography>Zoom: {zoomPercent(zoom)}</Typography>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(Number(zoom))}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={cropImage}>
              Crop
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {error && <LabelError>😔 Sorry! The Image is too big...</LabelError>}
    </Stack>
  );
};

export default UploadImage;

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}%`;
};
