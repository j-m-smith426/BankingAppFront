import { FC, useState } from "react";

import classes from "./Details.module.css";
import lookupClasses from "../AdminComponents/Lookup.module.css";
import { useSelector } from "react-redux";
import { IStoreState } from "../../redux/Store";
import IAccount from "../../models/Account";
import TransactionTable from "./TransactionTable";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";
import Deposit from "./Deposit";

const AccountDetails: FC = (props) => {
  const account: IAccount | null = useSelector((state: IStoreState) => {
    const selected = state.account.selected;
    if (selected !== null) {
      return state.account.accounts[selected];
    } else {
      return null;
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleDeposit = () => {
    setShowModal(true);
    setModalType("Deposit");
  };

  return (
    <div className={"container"}>
      <div className={lookupClasses.resultBox + " " + classes.fill}>
        <div className={classes.top}>
          <div className={classes.nav}>
            <input type="button" value="Deposit" onClick={handleDeposit} />
            <input type="button" value="Withdraw" />
            <input type="button" value="Transfer" />
          </div>
          <div className={classes.balance}>
            Balance: {account && account.currentBalance}
            <input type="button" value="close" onClick={handleClose} />
          </div>
        </div>
        <div className={classes.divider} />
        <div className={classes.sort}>
          <div className={classes.inputGroup}>
            <label htmlFor="begin">Start</label>
            <input type="date" name="begin" id="" />
          </div>
          <div className={classes.inputGroup}>
            <label htmlFor="end">End</label>
            <input type="date" name="end" id="" />
          </div>
          <input type="button" value="Sort" />
        </div>
        <div className={lookupClasses.resultBox}>
          <TransactionTable />
        </div>
      </div>
      {showModal && modalType === "Deposit" && <Deposit close={setShowModal} />}
      {showModal && modalType === "Withdraw" && (
        <Withdraw close={setShowModal} />
      )}
      {showModal && modalType === "Transfer" && (
        <Transfer close={setShowModal} />
      )}
    </div>
  );
};

export default AccountDetails;
