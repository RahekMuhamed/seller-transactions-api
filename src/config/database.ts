import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("seller-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
sequelize.authenticate()
.then(() => {console.log('connected to the database')})
.catch((error)=>{
    console.error('Unable to connect to the database:', error);
})