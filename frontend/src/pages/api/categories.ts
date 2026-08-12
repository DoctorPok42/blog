import type { NextApiRequest, NextApiResponse } from "next";
import { dataService } from "../../../services/data.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = await dataService.getCategories();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API /api/posts error:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
}
