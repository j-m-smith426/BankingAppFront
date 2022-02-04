import { FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { IVerifyPassword, verifyPassword } from "../../redux/actions/userSlice";
import { IStoreState } from "../../redux/Store";

import classes from "./Login.module.css";
const ChangePassword: FC = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [verifyPass, setVerifyPass] = useState("");
  const user = useSelector((state: IStoreState) => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (current === user.password && newPass === verifyPass) {
      const verifyObject: IVerifyPassword = {
        currentPassword: current,
        newPassword: newPass,
      };
      dispatch(verifyPassword(verifyObject));
      navigation("/");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="current">Current Password</label>
          <input
            type="text"
            name="current Password"
            id="current"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="newPass">New Password</label>
          <input
            type="text"
            name="new Password"
            id="newPass"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="verify">Verify Password</label>
          <input
            type="text"
            name="verify Password"
            id="verify"
            value={verifyPass}
            onChange={(e) => setVerifyPass(e.target.value)}
          />
        </div>
        <input type="submit" value="Confirm" className={classes.submit} />
      </form>
    </div>
  );
};

export default ChangePassword;
