import { Router } from "express";
import { getTransactionsSummary } from "../controllers/sellerController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/transactions-summary", verifyToken, getTransactionsSummary);
router.get("/test", (req, res) => {
    res.send("Seller route works!");});

export default router;
