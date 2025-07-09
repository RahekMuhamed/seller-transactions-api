import {Router} from "express";
import { getTransactions } from "../controllers/transactionController";

const router = Router();

router.get("/transactions", getTransactions);
// router.get("/transactions/:id", getTransactions); 
router.get("/test", (req, res) => {
  res.send(  "Test route is working!" );});
export default router;