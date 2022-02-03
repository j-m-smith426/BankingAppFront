import { Dispatch, FC, SetStateAction } from "react";
import Modal from "./Modal";

interface IProps {
  close: Dispatch<SetStateAction<boolean>>;
}

const Deposit: FC<IProps> = (props) => {
  return (
    <Modal close={props.close}>
      <h3>Deposit</h3>
      <div className="resultBox">
        <div className="inputGroup">
          <label htmlFor="Amount">Amount</label>
          <input type="text" name="Amount" id="amount" />
        </div>
        <input type="button" value="submit" className="cancel" />
      </div>
    </Modal>
  );
};

export default Deposit;
