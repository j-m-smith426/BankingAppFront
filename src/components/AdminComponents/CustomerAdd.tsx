import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCustomer } from "../../redux/actions/customerSlice";
import { IStoreState } from "../../redux/Store";
import classes from "./Lookup.module.css"

interface IProps
{
    pid: number;
}

const CustomerAdd:FC<IProps> = (props) =>
{
    const customer = useSelector((state: IStoreState) => state.customer.customer)
    const dispatch = useDispatch();

    return (
        <div className={classes.resultBox}>
            <input type="button" value={"cancel"} onClick={() => dispatch(clearCustomer(''))} className={classes.cancel}/>
            <div className={classes.rowGroup}>
            <div className={classes.inputGroup}>
                    <h3>Create New Customer</h3>
                    </div>
                <div className={classes.inputGroup}>
                    <label htmlFor="">PID</label>
                    <input type="text" name="" id="" value={props.pid} disabled className={classes.inputText}/>
            </div>
                </div>
            <div className={classes.rowGroup}>
                <div className={classes.inputGroup}>
                <label htmlFor="">Name</label>
                    <input type="text" name="" id="" className={classes.inputText}/>
            </div>
            <div className={classes.inputGroup}>
                <label htmlFor="">Email</label>
                <input type="text" name="" id="" className={classes.inputText}/>
                </div>
            </div>
            <div className={classes.rowGroup}>
            <div className={classes.inputGroup}>
                <label htmlFor="">DOB</label>
                <input type="text" name="" id="" className={classes.inputText}/>
            </div>
            <div className={classes.inputGroup}>
                <label htmlFor="">Postal</label>
                <input type="text" name="" id="" className={classes.inputText}/>
                </div>
            </div>
            
           
            
            <input type="submit" value="save" className={classes.cancel}/>
                
            
            <div className={classes.rowGroup}>
                
            </div>
        </div>
    );
}

export default CustomerAdd;