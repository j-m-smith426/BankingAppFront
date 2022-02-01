import classes from './MainAdmin.module.css'
import { FC, FormEvent } from 'react';

const MainAdmin:FC = (props) =>
{
    const handleSubmit = (event: FormEvent) =>
    {
        event.preventDefault();

    }

    return (
        <div className="workspace">
            <h3>Look up account</h3>
            <form onSubmit={handleSubmit}>
            <div className={classes.inputGroup}>
            <label htmlFor="PID">PID: </label>
                <input type="text" name="PID" id="PID" />
                <input type="submit" value="Search" />
            </div>

            </form>
        </div>
    );
}

export default MainAdmin;