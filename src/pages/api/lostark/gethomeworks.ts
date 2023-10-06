// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = any;

type Character = {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
};

type CharacterList = Character[] | [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();

  const homeWorkList = await prisma.characters.findMany();

  try {
    if (homeWorkList.length > 0) {
      res.status(200).json({
        message: "success",
        data: homeWorkList,
      });
    } else {
      res.status(200).json({
        message: "no Data",
        data: homeWorkList,
      });
    }
  } catch (e) {
    res.status(409).json({
      message: "error",
      data: e,
    });
  }
}
