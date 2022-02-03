import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelected,
  retrieveAccounts,
  setSelected,
} from "../../redux/actions/accountSlice";
import { clearCustomer } from "../../redux/actions/customerSlice";
import { IStoreState } from "../../redux/Store";
import AccountListItem from "./AccountListItem";
import AddAccountBox from "./AddAccountBox";
import classes from "./Lookup.module.css";

const CustomerResult: FC = (props) => {
  const customer = useSelector((state: IStoreState) => state.customer.customer);
  const accounts = useSelector((state: IStoreState) => state.account.accounts);
  const selectedAccount = useSelector(
    (state: IStoreState) => state.account.selected
  );
  const [addAccount, setAddAccount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveAccounts());
    dispatch(clearSelected(""));
  }, []);

  return (
    <div className={classes.resultBox}>
      <input
        type="button"
        value={"cancel"}
        onClick={() => dispatch(clearCustomer(""))}
        className={classes.cancel}
      />
      <h3>PID: {customer.customerUniqueID}</h3>

      <div className={classes.rowGroup}>
        <div className={classes.inputGroup}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name=""
            id=""
            className={classes.inputText}
            disabled
            value={customer.name}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name=""
            id=""
            className={classes.inputText}
            disabled
            value={customer.email}
          />
        </div>
      </div>
      <div className={classes.rowGroup}>
        <div className={classes.inputGroup}>
          <label htmlFor="">DOB</label>
          <input
            type="text"
            name=""
            id=""
            className={classes.inputText}
            disabled
            value={customer.dob}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="">Postal</label>
          <input
            type="number"
            name=""
            id=""
            className={classes.inputText}
            disabled
            value={customer.customerUniqueID}
          />
        </div>
      </div>
      <div className={classes.inputGroup}></div>
      <div className={classes.accountList}>
        <ul>
          {accounts.map((account, index) => (
            <AccountListItem
              account={account}
              index={index}
              selected={selectedAccount === index}
            />
          ))}
        </ul>
        <div className={classes.rowGroup}>
          {addAccount ? (
            <AddAccountBox close={setAddAccount} />
          ) : (
            <input
              type="submit"
              value="add"
              className={classes.cancel}
              onClick={() => setAddAccount(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerResult;
