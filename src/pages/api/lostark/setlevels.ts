// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Character = {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const API_KEY = process.env.LOST_ARK_TEST_API_KEY;

  const enCodedId = encodeURIComponent(body.myList[0].name);

  const prisma = new PrismaClient();

  let url = `https://developer-lostark.game.onstove.com/characters/${enCodedId}/siblings`;
  let result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${API_KEY}`,
    },
  });
  const characters = (await result.json()) as Character[];

  try {
    body.myList.forEach(async (character: any) => {
      const pickedCharacter = characters.filter(
        (x) => x.CharacterName === character.name
      );
      if (pickedCharacter.length > 0) {
        if (
          Number(pickedCharacter[0].ItemMaxLevel.replaceAll(",", "")) !==
          Number(character.level)
        ) {
          // console.log("현재 캐릭터 : ", pickedCharacter[0]);
          await prisma.characters.update({
            where: {
              id: character.id,
            },
            data: {
              level: Number(
                pickedCharacter[0].ItemMaxLevel.replaceAll(",", "")
              ).toString(),
            },
          });
        }
      }
    });

    const homeWorkList = await prisma.characters.findMany({
      orderBy: {
        level: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: homeWorkList,
    });
  } catch (e) {
    res.status(409).json({
      status: "failed",
      data: e,
    });
  }
}
