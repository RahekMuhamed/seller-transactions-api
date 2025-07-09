import express from "express";
import "./models";
import { sequelize } from "./config/database";
import transactionRoutes from "./routers/transactionRoutes";

const app = express();

app.use(express.json());
app.use("/api", transactionRoutes);
console.log("tranctionis",transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ force: false });
    console.log("Models synchronized successfully.");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
