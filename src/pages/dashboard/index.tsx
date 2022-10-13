/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/system";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import Layout from "../../components/Layout/Layout";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const [preview, setPreview] = useState();
  const [previewEdited, setPreviewEdited] = useState();
  const [urlImage, setUrlImage] = useState("");
  const [images, setImages] = useState([]);

  const avatarRef = useRef();

  const { data: session } = useSession();

  const handleOnChange = async ({ target }) => {
    const image = target.files[0];
    setUrlImage(URL.createObjectURL(image));

    await axios
      .get("http://localhost:3000/api/thumbnails/")
      .then((res) => setImages(res.data));

    const reader = new FileReader();

    reader.onloadend = () => {
      // avatarRef.current.src = reader.result;
      setPreview(reader.result);
    };

    reader.readAsDataURL(image);
  };

  console.log(images);

  return (
    <Layout session={session}>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Box>
          <Typography>Filters</Typography>
          <Button>Bright</Button>
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
              width: "350px",
              height: "350px",
              borderRadius: "100%",
              border: "1px",

              overflow: "hidden",
            }}
          >
            {preview ? (
              <div
                id="avatar"
                style={{
                  width: "350px",
                  height: "350px",
                  borderRadius: "100%",
                  border: "1px",

                  overflow: "hidden",
                }}
              >
                <img
                  ref={avatarRef}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={preview}
                  alt="avatar"
                />
              </div>
            ) : (
              <div
                id="avatar"
                style={{
                  width: "350px",
                  height: "350px",
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
            )}
          </div>
        </label>
      </Box>
      <Stack
        padding="10px"
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {images.map((image) => (
          <img
            style={{ filter: `${image.filter}` }}
            alt="image"
            key={image}
            src={urlImage}
            width={image.width}
            height={image.height}
          />
        ))}
      </Stack>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
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
