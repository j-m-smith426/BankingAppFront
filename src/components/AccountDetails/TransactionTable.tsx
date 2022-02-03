import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ITransaction from "../../models/Transaction";
import { TransactionsByAccount } from "../../redux/actions/transactionSlice";
import { IStoreState } from "../../redux/Store";
import TransactionItem from "./TransactionItem";

const TransactionTable: FC = () => {
  const transactions = useSelector(
    (state: IStoreState) => state.transaction.transactions
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TransactionsByAccount());
  }, []);
  console.log(transactions);
  return (
    <table>
      <tbody>
        <tr className="tableRow">
          <td>Date</td>
          <td>Name</td>
          <td>Type</td>
          <td>Sub-type</td>
          <td>Remaining Balance</td>
        </tr>
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
