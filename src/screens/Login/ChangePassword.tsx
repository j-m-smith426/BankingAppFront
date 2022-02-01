import { FC, FormEvent } from "react";

import classes from "./Login.module.css"
const ChangePassword: FC = () =>
{
    const handleSubmit = (event: FormEvent) =>
    {
        event.preventDefault();
    }


    return (
        <div className="container">
           <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label htmlFor="current Password">Current Password</label>
                    <input type="text" name="current Password" id="current" />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="new Password">New Password</label>
                    <input type="text" name="new Password" id="newPass" />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="verify Password">Verify Password</label>
                    <input type="text" name="verify Password" id="verify" />
                </div>
                <input type="submit" value="Confirm" className={classes.submit}/>
            </form>
        </div>
    );
}

export default ChangePassword;