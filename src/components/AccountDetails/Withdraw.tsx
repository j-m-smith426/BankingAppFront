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
const Withdraw: FC<IProps> = (props) => {
  const [amount, setAmount] = useState("0");
  const [type, setType] = useState("credit");
  const dispatch = useDispatch();
  const account: IAccount | null = useSelector((state: IStoreState) => {
    const selected = state.account.selected;
    if (selected !== null) {
      return state.account.accounts[selected];
    } else {
      return null;
    }
  });
  const sendTransaction = () => {
    const createdTransaction: ITransaction = {
      transactionID: null,
      referenceName: "Withdraw",
      transaction_date: new Date().toISOString().substring(0, 10),
      transaction_type: type,
      transaction_subtype: "Cash",
      currentBalance: account!.currentBalance - +amount,
      associatedAccount: {
        accountID: account!.accountID!,
      },
    };
    if (+amount >= 0) {
      dispatch(SaveTransaction(createdTransaction));
      props.close(false);
    }
  };
  return (
    <Modal close={props.close}>
      <h3>Withdraw</h3>
      <div className="resultBox">
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
        <input
          type="button"
          value="submit"
          className="cancel"
          onClick={sendTransaction}
        />
      </div>
    </Modal>
  );
};

export default Withdraw;
