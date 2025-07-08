import { seller } from "./models/Seller";
import { Transaction } from "./models/Transaction";
seller.hasMany(Transaction, {foreignKey: 'seller_id'});
Transaction.belongsTo(seller, {foreignKey: 'seller_id'});
export { seller,Transaction};