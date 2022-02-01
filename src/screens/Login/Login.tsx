import { FC, FormEvent, HtmlHTMLAttributes, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigationType } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { ICredentials, login } from "../../redux/actions/userSlice";
import { IStoreState } from "../../redux/Store";

import classes from "./Login.module.css"

const Login: FC = () =>
{
    const user = useSelector((state: IStoreState) => state.user.user)
    const error = useSelector((state: IStoreState) => state.user.error)
    const status = useSelector((state:IStoreState) => state.user.status)
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const handleSubmit = async(event: FormEvent) =>
    {
        event.preventDefault();
        const credentials: ICredentials = {
            username: +username,
            password

        }
        dispatch(login(credentials))
        
        
    }
    if (status === "loading") {
        return (
            <div className="container">
            <Loading />
            </div>
        )
    }

    return (
        <div className="container">{/*login box*/}
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
            <label htmlFor="username">UserName</label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUserName(e.target.value)} />
                    
                </div>
                <div className={classes.formGroup}>
            <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                </div>
                <input type="submit" value="Login" className={classes.submit}/>
            </form>
            {user.userID !== 0 && !user.verified && <Navigate to="/verify" replace={true} />}
            {user.userID !== 0 && user.verified && <Navigate to="/home" replace={true}/>}
            {error || ''}
        </div>
    );
}

export default Login;