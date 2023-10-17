// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  id: number;
  name?: string;
  character1?: string;
  character2?: string;
  character3?: string;
  character4?: string;
  character5?: string;
  character6?: string;
};

type Result = Data[] | {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  try {
    const prisma = new PrismaClient();
    const UserData = await prisma.users.findMany({
      orderBy: {
        id: "asc",
      },
    });
    // console.log("member 요청들어옴 : ", UserData);
    if (UserData.length > 0) {
      res.status(200).json({
        message: "success",
        data: UserData,
      });
    } else {
      res.status(200).json({
        message: "no Data",
        data: UserData,
      });
    }
  } catch (e) {
    res.status(409).json({
      message: "error",
      data: e,
    });
  }
}
