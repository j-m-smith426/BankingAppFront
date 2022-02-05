import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICustomer, { defaultCustomer } from "../../models/Customer";
import { clearCustomer, saveCustomer } from "../../redux/actions/customerSlice";
import { IStoreState } from "../../redux/Store";
import classes from "./Lookup.module.css";

interface IProps {
  pid: number;
}

const CustomerAdd: FC<IProps> = (props) => {
  const customer = useSelector((state: IStoreState) => state.customer.customer);
  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const dispatch = useDispatch();

  const saveCustomerhandler = () => {
    const createdCustomer: ICustomer = {
      customerUniqueID: props.pid,
      user: defaultCustomer.user,
      name,
      postal: +postal,
      email,
      dob,
    };
    dispatch(saveCustomer(createdCustomer));
  };

  return (
    <div className={classes.resultBox}>
      <input
        type="button"
        value={"cancel"}
        onClick={() => dispatch(clearCustomer(""))}
        className={classes.cancel}
      />
      <div className={classes.rowGroup}>
        <div className={classes.inputGroup}>
          <h3>Create New Customer</h3>
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="">PID</label>
          <input
            type="text"
            name=""
            id=""
            value={props.pid}
            disabled
            className={classes.inputText}
          />
        </div>
      </div>
      <div className={classes.rowGroup}>
        <div className={classes.inputGroup}>
          <label htmlFor="customerName">Name</label>
          <input
            type="text"
            name="customerName"
            id="customerName"
            className={classes.inputText}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="customerEmail">Email</label>
          <input
            type="email"
            name="customerEmail"
            id="customerEmail"
            className={classes.inputText}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.rowGroup}>
        <div className={classes.inputGroup}>
          <label htmlFor="customerDOB">DOB</label>
          <input
            type="text"
            name="customerDOB"
            id="customerDOB"
            className={classes.inputText}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="customerPostal">Postal</label>
          <input
            type="number"
            name="customerPostal"
            id="customerPostal"
            className={classes.inputText}
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>
      </div>

      <input
        type="submit"
        value="save"
        className={classes.cancel}
        onClick={saveCustomerhandler}
      />
    </div>
  );
};

export default CustomerAdd;
