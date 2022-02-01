import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IStoreState } from "../redux/Store";


const ProtectedRoute: FC = (props) =>
{
    const user = useSelector((state: IStoreState) => state.user.user)
    if (user.userID === 0) {
        return (<Navigate to="/" replace />)
    } else {
        return(
        <>
            {props.children}
        </>
        )
        }
}

export default ProtectedRoute;