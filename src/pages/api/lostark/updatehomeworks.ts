// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { raidKeys } from "src/types/types";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  const prisma = new PrismaClient();

  const updateHomeWorkList = await prisma.characters.update({
    where: {
      id: body.id,
    },
    data: {
      karman_h: body.karman_h,
      karman_n: body.karman_n,
      tower_h: body.tower_h,
      tower_n: body.tower_n,
      illiakan_h: body.illiakan_h,
      illiakan_n: body.illiakan_n,
      kayangel_h: body.kayangel_h,
      kayangel_n: body.kayangel_n,
      abrelshud_h: body.abrelshud_h,
      abrelshud_n: body.abrelshud_n,
      kouku_n: body.kouku_n,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      updateHomeWorkList,
    },
  });
}
