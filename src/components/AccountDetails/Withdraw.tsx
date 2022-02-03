import { Dispatch, FC, SetStateAction } from "react";
import Modal from "./Modal";
interface IProps {
  close: Dispatch<SetStateAction<boolean>>;
}
const Withdraw: FC<IProps> = (props) => {
  return <Modal close={props.close}></Modal>;
};

export default Withdraw;
