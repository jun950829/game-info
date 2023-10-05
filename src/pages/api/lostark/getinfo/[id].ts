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
  const { id } = req.query;

  const API_KEY = process.env.LOST_ARK_TEST_API_KEY;

  const prisma = new PrismaClient();

  console.log(id);

  let url = `https://developer-lostark.game.onstove.com/characters/${id}/siblings`;
  let result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${API_KEY}`,
    },
  });
  const characters = (await result.json()) as Character[];

  res.status(200).json({
    data: characters,
  });
}
