import type { NextApiRequest, NextApiResponse } from "next";
import { dataService } from "../../../services/data.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const page = Number.parseInt(req.query.page as string) || 1;
  const pageSize = Number.parseInt(req.query.pageSize as string) || 12;
  const category = decodeURIComponent(req.query.category as string | undefined || "");

  try {
    const data = await dataService.getPosts(pageSize, page, category);
    return res.status(200).json(data);
  } catch (error) {
    console.error("API /api/posts error:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
}
