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
  const API_KEY = process.env.LOST_ARK_TEST_API_KEY;

  const prisma = new PrismaClient();
  const UserData = ["시즌", "연애연", "뛰아가", "목동", "AgentSJ", "손민수"];

  if (UserData.length > 0) {
    let mainId = UserData[0];
    mainId = encodeURIComponent(mainId);

    let url = `https://developer-lostark.game.onstove.com/characters/${mainId}/siblings`;
    let result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${API_KEY}`,
      },
    });
    let characters = (await result.json()) as Character[];
    // characters = characters.filter((x: any) =>
    //   UserData.includes(x.CharacterName.trim())
    // );
    const myList = characters.reduce((prev, cur) => {
      if (UserData.includes(cur.CharacterName)) {
        prev = [...prev, cur];
      }
      return prev;
    }, [] as CharacterList);
    // console.log(characters);

    res.status(200).json({
      data: myList,
    });
  }
}
