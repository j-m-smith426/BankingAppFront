import { FC } from "react";
import ITransaction from "../../models/Transaction";
interface IProps {
  transaction: ITransaction;
}

const TransactionItem: FC<IProps> = (props) => {
  const { transaction } = props;
  console.log(transaction);
  return (
    <tr key={transaction.transactionID} className="tableRow">
      <td>{transaction.transaction_date}</td>
      <td>{transaction.referenceName}</td>
      <td>{transaction.transaction_type}</td>
      <td>{transaction.transaction_subtype}</td>
      <td>${transaction.currentBalance}</td>
    </tr>
  );
};

export default TransactionItem;
