/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/system";
import type { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";

import { Toaster } from "react-hot-toast";

import Layout from "../../components/Layout/Layout";
import { Stack, Typography } from "@mui/material";

import { getSession, useSession } from "next-auth/react";
import UploadImage from "../../components/UploadImage/UploadImage";
import { motion } from "framer-motion";

import { DataImage } from "../../types/components";
import { contrastFilter, grayScaleFilter } from "../../../services/helpers";
import { getImages } from "../../../services/api";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ActionButtons from "../../components/ActionsButtons/ActionButtons";

const Home: NextPage = () => {
  const [preview, setPreview] = useState<string>("");
  const [urlImage, setUrlImage] = useState<string>("");
  const [images, setImages] = useState<DataImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const avatarRef = useRef<any>();

  const { data: session } = useSession();

  const handleOnChange = async (event: FormEvent<HTMLInputElement>) => {
    setError(false);
    setIsLoading(true);
    setShowButton(false);
    const image = event.currentTarget.files?.length
      ? event.currentTarget.files[0]
      : null;

    if (Number(image?.size) > 2000000) {
      setError(true);
      setPreview("");
      setUrlImage("");
      setImages([]);
      setIsLoading(false);
    } else {
      const reader = new FileReader();
      image && reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      setTimeout(() => {
        getImages().then((res) => setImages(res.data));
        image && setUrlImage(URL.createObjectURL(image));
        setIsLoading(false);
        setShowButton(true);
      }, 3000);
    }
  };

  const changeContrast = () => {
    setImages(contrastFilter(images));
  };

  const changeOriginal = () => {
    getImages().then((res) => setImages(res.data));
  };

  const changeGrayScale = () => {
    setImages(grayScaleFilter(images));
  };

  return (
    <Layout session={session}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "60px",
          marginTop: "60px",
          alignItems: "center",
        }}
      >
        <Stack spacing={3}>
          <UploadImage
            handleOnChange={handleOnChange}
            preview={preview}
            avatarRef={avatarRef}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                color="error.main"
                fontFamily="monospace"
                fontSize="2rem"
              >
                😔 Sorry! The Image is too big...
              </Typography>
            </motion.div>
          )}
        </Stack>

        <Stack>
          {showButton && (
            <motion.div
              style={{ margin: "auto" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: "flex", gap: "10px", margin: "auto" }}>
                <ButtonPrimary onClick={changeOriginal}>Original</ButtonPrimary>
                <ButtonPrimary onClick={changeContrast}>Contrast</ButtonPrimary>
                <ButtonPrimary onClick={changeGrayScale}>
                  GrayScale
                </ButtonPrimary>
              </Box>
            </motion.div>
          )}

          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "row",
              gap: "5rem",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "5rem",
            }}
          >
            {isLoading ? (
              <img src="./loading.gif" alt="loading" />
            ) : (
              images?.map((image, index) => (
                <motion.div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                  animate={{ y: -50 }}
                  transition={{ ease: "easeOut", duration: 2 }}
                >
                  <Box
                    sx={{
                      width: { xs: "180px", md: "200px" },
                      height: { xs: "180px", md: "200px" },
                      borderRadius: "100%",
                      border: "2px primary solid",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: `${image.filter}`,
                      }}
                      alt="image"
                      src={urlImage}
                    />
                  </Box>
                  <ActionButtons image={image} avatarRef={avatarRef} />
                </motion.div>
              ))
            )}
          </Box>
        </Stack>
      </Box>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 100,
        }}
        reverseOrder={false}
      />
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/",
      },
    };

  return {
    props: {
      session,
    },
  };
};
