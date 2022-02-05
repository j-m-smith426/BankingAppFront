import { Dispatch, FC, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IAccount from "../../models/Account";
import { saveAccount } from "../../redux/actions/accountSlice";
import { IStoreState } from "../../redux/Store";
import classes from "./Lookup.module.css";

interface IProps {
  close: Dispatch<SetStateAction<boolean>>;
}
const AddAccountBox: FC<IProps> = (props) => {
  const customer = useSelector((state: IStoreState) => state.customer.customer);
  const [amount, setAmount] = useState("0");
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const account: IAccount = {
      accountID: null,
      customer: {
        customerUniqueID: customer.customerUniqueID,
      },
      currentBalance: +amount,
    };
    dispatch(saveAccount(account));
    props.close(false);
  };

  return (
    <div className={classes.listItem}>
      <h4>Add Account</h4>
      <div className={classes.inputGroup}>
        <label htmlFor="starting">Starting Balance</label>
        <input
          type="number"
          name="starting"
          id="starting"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <input type="button" value="add" onClick={handleSubmit} />
        <input
          type="button"
          value="close"
          onClick={() => props.close((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default AddAccountBox;
