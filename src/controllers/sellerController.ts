import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Seller } from "../models/Seller";
import { Op, fn, col, literal,Sequelize } from "sequelize";

export const getTransactionsSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers["token"];
    if (!token) {
      res.status(401).json({ error: "token is missing" });
      return;
    }

    const { seller_id, date_range } = req.query;

    if (!seller_id) {
      res.status(400).json({ error: "seller_id is required" });
      return;
    }

    const whereClause: any = {
      seller_id: Number(seller_id),
    };

    if (date_range && typeof date_range === "string") {
      const [start, end] = date_range.split(",");
      if (
        start &&
        end &&
        !isNaN(Date.parse(start)) &&
        !isNaN(Date.parse(end))
      ) {
        whereClause.last_updated = {
          [Op.between]: [new Date(start), new Date(end)],
        };
      }
    }

    const summary = await Transaction.findAll({
      attributes: [
        [fn("DATE", col("last_updated")), "date"],
        [fn("SUM", col("price")), "total_income"],
        "seller_id",
      ],
      where: whereClause,
      group: [fn("DATE", col("last_updated")), "seller_id"],

      include: [
        {
          model: Seller,
          attributes: ["name"],
        },
      ],
      order: [[literal("date"), "ASC"]],
    });

    const days = summary.map((item: any) => ({
      date: item.get("date"),
      total_income: item.get("total_income"),
      seller_id: item.get("seller_id"),
      seller_name: item.Seller.name,
    }));

    res.json({ data: { days } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
