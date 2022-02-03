import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { lookupCustomer } from "../../redux/actions/customerSlice";

import classes from "./Lookup.module.css"

interface IProps
{
    setPid:Dispatch<SetStateAction<number>>
}
const CustomerLookup:FC<IProps> = (props) =>
{
    const [pid, setPid] = useState<string>();
    const dispatch = useDispatch();
    const handleSubmit = (event: FormEvent) =>
    {
        event.preventDefault();
        if (pid !== undefined) {
            
            const id = Number.parseInt(pid);
            dispatch(lookupCustomer(id));
            props.setPid(id);
        }
    }
    return (
        <>
        <h3>Look up account</h3>
            <form onSubmit={handleSubmit}>
            <div className={classes.lookup}>
            <label htmlFor="PID">PID: </label>
                <input type="number" name="PID" id="PID" value={pid} onChange={(e) => setPid(e.target.value)}/>
                <input type="submit" value="Search" />
            </div>

            </form>
        </>
    );
}

export default CustomerLookup;