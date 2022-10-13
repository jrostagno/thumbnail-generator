// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { width: string; height: string; filter: string }[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([
    {
      width: "400px",
      height: "300px",
      filter: "sepia(1)",
    },
    {
      width: "160px",
      height: "120px",
      filter: "brightness(130%) saturate(129%) invert(0%) grayscale(0%)",
    },
    {
      width: "120px",
      height: "120px",
      filter: "brightness(200%) saturate(80%) invert(30%) grayscale(100%)",
    },
  ]);
}
