import { Dispatch, FC, SetStateAction } from "react";
interface IProps {
  close: Dispatch<SetStateAction<boolean>>;
}
const Modal: FC<IProps> = (props) => {
  return (
    <>
      <div className="modelBG" />
      <div className="modalBox">
        {props.children}
        <div>
          <input
            type="button"
            value="cancel"
            onClick={() => props.close(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
