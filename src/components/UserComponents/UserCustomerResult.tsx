import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  retrieveAccounts,
  clearSelected,
} from "../../redux/actions/accountSlice";
import { clearCustomer } from "../../redux/actions/customerSlice";
import { IStoreState } from "../../redux/Store";
import AccountListItem from "../AdminComponents/AccountListItem";

import classes from "../AdminComponents/Lookup.module.css";

const UserCustomerResult: FC = (props) => {
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
      </div>
    </div>
  );
};

export default UserCustomerResult;
