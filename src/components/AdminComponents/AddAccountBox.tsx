import { Dispatch, FC, SetStateAction } from "react";
import classes from "./Lookup.module.css"

interface IProps
{
    close:Dispatch<SetStateAction<boolean>>
}
const AddAccountBox:FC<IProps> = (props) =>
{
    
    return (
        <div className={classes.listItem}>
            <h4>Add Account</h4>
            <div className={classes.inputGroup}>
                <label htmlFor="starting">Starting Balance</label>
                <input type="text" name="starting" id="starting" />
            </div>
            <div >

            <input type="button" value="add" />
            <input type="button" value="close" onClick={() => props.close((prev) => !prev)} />
            </div>
        </div>
    );
}

export default AddAccountBox;