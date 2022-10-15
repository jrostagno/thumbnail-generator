/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/system";
import type { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";

import Layout from "../../components/Layout/Layout";
import { Button, Stack } from "@mui/material";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import UploadImage from "../../components/UploadImage/UploadImage";
import { motion } from "framer-motion";

import { FaDownload } from "react-icons/fa";
import { DataImages } from "../../types/componets";

const Home: NextPage = () => {
  const [preview, setPreview] = useState<string>();
  const [urlImage, setUrlImage] = useState<string>("");
  const [images, setImages] = useState<DataImages>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const avatarRef = useRef<any>();

  const { data: session } = useSession();

  const handleOnChange = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    const image = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(image);

    setTimeout(async () => {
      await axios
        .get("http://localhost:3000/api/thumbnails/")
        .then((res) => setImages(res.data));
      setUrlImage(URL.createObjectURL(image));
      setIsLoading(false);
    }, 3000);
  };

  const saveImage = (filter: string, width: number, height: number) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx!.filter = filter;
    ctx!.translate(canvas.width / 2, canvas.height / 2);

    ctx!.drawImage(
      avatarRef.current,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Layout session={session}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: "20px",
          gap: "60px",
          marginTop: "60px",
          alignItems: "center",
        }}
      >
        <Stack spacing={3} sx={{ marginLeft: { xs: "0px", md: "60px" } }}>
          <UploadImage
            handleOnChange={handleOnChange}
            preview={preview}
            avatarRef={avatarRef}
          />

          <Button variant="outlined">Apply</Button>
        </Stack>
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
            images.map((image, index) => (
              <motion.div
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
                    border: "2px #10b981 solid",
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
                    key={index}
                    src={urlImage}
                  />
                </Box>

                <FaDownload
                  style={{ color: "#10b981" }}
                  onClick={() =>
                    saveImage(image.filter, image.width, image.height)
                  }
                />
              </motion.div>
            ))
          )}
        </Box>
      </Box>
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
