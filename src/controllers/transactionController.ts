import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Op ,Sequelize} from "sequelize";
import { Seller } from "../models/Seller";
interface TransactionSummary {
  date: string;
  total_income: string;
}
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
export const getTransactionsSummary = async (req: Request, res: Response) => {
  try {
    const { seller_id, date_range } = req.query;

    if (!seller_id) {
      res.status(400).json({ error: "seller_id is required" });
      return;
    }

    const whereClause: any = {
      seller_id: Number(seller_id),
    };

    if (date_range) {
      const [start, end] = (date_range as string).split(",");
      whereClause.last_updated = {
        [Op.between]: [new Date(start), new Date(end)],
      };
    }

    const data = await Transaction.findAll({
      where: whereClause,
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("last_updated")), "date"],
        [Sequelize.fn("SUM", Sequelize.col("price")), "total_income"],
      ],
      group: [Sequelize.fn("DATE", Sequelize.col("last_updated"))],
      raw: true,
    }) as unknown as TransactionSummary[];
    

    const seller = await Seller.findByPk(Number(seller_id));
    if (!seller) {
      res.status(404).json({ error: "Seller not found" });
      return;
    }

    const result = data.map((item) => ({
      date: item.date,
      total_income: Number(item.total_income),
      seller_name: seller.name,
      seller_id: seller.id,
    }));

    res.json({ data: { days: result } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};