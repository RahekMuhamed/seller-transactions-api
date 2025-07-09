import { Seller } from "./Seller";
import { Transaction } from "./Transaction";
Seller.hasMany(Transaction, {foreignKey: 'seller_id'});
Transaction.belongsTo(Seller, {foreignKey: 'seller_id'});
export { Seller,Transaction};