import {Router} from "express";
import { getTransactions, } from "../controllers/transactionController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/transactions",verifyToken, getTransactions);


 router.get("/test", (req, res) => {
  res.send(  "Test route is working!" );});
export default router;