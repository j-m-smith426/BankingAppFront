import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import IAccount from "../../models/Account";
import { setSelected } from "../../redux/actions/accountSlice";
import classes from "./Lookup.module.css";


interface IProps
{
    account: IAccount
    selected: boolean
    index:number
}

const AccountListItem: FC<IProps> = (props) =>
{
    const [view, setView] = useState(false);
    const dispatch = useDispatch();
    const account = props.account;
    const stringID:string = '' + account.accountID;
    const masked = stringID.slice(stringID.length - 4)

    const handleClick = () =>
    {
        setView(true);
    }

    return (
        <li className={classes.listItem} key={account.accountID} onClick={() => dispatch(setSelected(props.index))}>
            
            <h4>Account ending in {masked}</h4>
            <h4>Balance: ${account.currentBalance}</h4>
            {props.selected && <input type="button" value="view" className={classes.view} onClick={() =>handleClick()}/>}
            {view && <Navigate to="/account" />}
        </li>
    );
}

export default AccountListItem;