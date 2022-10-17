import axios from "axios";

export const getImages = async () => {
  return await axios.get("http://localhost:3000/api/thumbnails/");
};
