// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DataImage } from "../../types/components";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataImage[]>
) {
  res.status(200).json([
    {
      width: 400,
      height: 300,
      filter: "sepia(1)",
      ref: "crop1",
    },
    {
      width: 160,
      height: 120,
      filter: "brightness(130%) saturate(129%) invert(0%) grayscale(0%)",
      ref: "crop2",
    },
    {
      width: 120,
      height: 120,
      filter: "grayscale(70%)",
      ref: "crop3",
    },
  ]);
}
