import { useSelector } from "react-redux";
import { IStoreState } from "../../redux/Store";
import MainAdmin from "../AdminScreens/MainAdmin";
import MainUser from "../UserScreens/MainUser";

const MainScreen = () =>
{
    const user = useSelector((state:IStoreState) => state.user.user)
    return (
        <div className="container">
            {user.userRole.roleName === "ADMIN" ? <MainAdmin />:<MainUser />}
        
        </div>
    );
}

export default MainScreen;