import { Dispatch, FC, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IAccount from "../../models/Account";
import ITransaction from "../../models/Transaction";
import { SaveTransaction } from "../../redux/actions/transactionSlice";
import { IStoreState } from "../../redux/Store";
import Modal from "./Modal";
interface IProps {
  close: Dispatch<SetStateAction<boolean>>;
}
const Transfer: FC<IProps> = (props) => {
  const [amount, setAmount] = useState("0");
  const [type, setType] = useState("credit");
  const dispatch = useDispatch();
  const [recipiant, setRecipiant] = useState("");
  const account: IAccount | null = useSelector((state: IStoreState) => {
    const selected = state.account.selected;
    if (selected !== null) {
      return state.account.accounts[selected];
    } else {
      return null;
    }
  });
  const savedTransaction = useSelector(
    (state: IStoreState) => state.transaction.savedTransactions
  );
  const accounts =
    useSelector(
      (state: IStoreState) =>
        account &&
        state.account.accounts.filter(
          (ref) => ref.accountID !== account.accountID!
        )
    ) || [];
  const handleClick = () => {
    if (+amount >= 0) {
      sendTransactionSelf();
      if (savedTransaction.transactionID !== null) {
        sendTransactionRecipient();
      }
      props.close(false);
    }
  };

  const sendTransactionRecipient = () => {
    const createdTransaction: ITransaction = {
      transactionID: null,
      referenceName:
        "Transferd from " +
        account!
          .accountID!.toString()
          .slice(account!.accountID!.toString().length - 4),
      transaction_date: new Date().toISOString().substring(0, 10),
      transaction_type: type,
      transaction_subtype: "Cash",
      currentBalance: account!.currentBalance + +amount,
      associatedAccount: {
        accountID: +recipiant,
      },
    };
    dispatch(SaveTransaction(createdTransaction));
  };

  const sendTransactionSelf = () => {
    const createdTransaction: ITransaction = {
      transactionID: null,
      referenceName: "Transfer to " + recipiant.slice(recipiant.length - 4),
      transaction_date: new Date().toISOString().substring(0, 10),
      transaction_type: type,
      transaction_subtype: "Cash",
      currentBalance: account!.currentBalance + +amount,
      associatedAccount: {
        accountID: account!.accountID!,
      },
    };
    dispatch(SaveTransaction(createdTransaction));
  };
  return (
    <Modal close={props.close}>
      <h3>Transfer</h3>
      <div className="resultBox">
        <label htmlFor="accounts">Transfer to:</label>
        <select name="accounts" id="accounts">
          {accounts.map((ref) => (
            <option value={"" + ref.accountID}>
              Ending in:{" "}
              {ref
                .accountID!.toString()
                .slice(ref.accountID!.toString().length - 4)}
            </option>
          ))}
        </select>
        <div className="inputGroup">
          <label htmlFor="Amount">Amount</label>
          <input
            type="number"
            name="Amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="credit">Credit</label>
          <input
            type="radio"
            name="type"
            id="credit"
            value={"Credit"}
            onChange={(e) => setType(e.target.value)}
            checked
          />
          <label htmlFor="Debit">Debit</label>
          <input
            type="radio"
            name="type"
            id="Debit"
            value={"Debit"}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <input type="button" value="submit" className="cancel" />
      </div>
    </Modal>
  );
};

export default Transfer;
