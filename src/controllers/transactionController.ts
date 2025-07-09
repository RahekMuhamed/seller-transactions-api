import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Op } from "sequelize";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try{
    const token=req.headers["token"];
    if (!token){
      res.status(401).json({ error: "token is missing" });
      return;
    }
 
    const { page = "1", per_page = "10", seller_id, date_range } = req.query;

    if (!seller_id) {
      res.status(400).json({ error: "seller_id is required" });
      return;
    }

    const limit = parseInt(per_page as string, 10);
    const pageNumber = parseInt(page as string, 10);
    const offset = (pageNumber - 1) * limit;

    const whereClause: any = {
      seller_id: Number(seller_id),
    };

    if (date_range && typeof date_range === "string") {
      const [start, end] = date_range.split(",");
      if (start && end) {
        whereClause.last_updated = {
          [Op.between]: [new Date(start), new Date(end)],
        };
      }
    }

    const { count, rows } = await Transaction.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["last_updated", "DESC"]],
      attributes: ["id", "title", "image", "price", "last_updated"], 
    });

    res.json({
      data: {
        transactions: rows,
        paging: {
          total: count,
          current_page: pageNumber,
          per_page: limit,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};