import { FC } from "react";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import AccountDetails from "../components/AccountDetails/AccountDetails";
import ChangePassword from "../screens/Login/ChangePassword";
import Login from "../screens/Login/Login";
import MainScreen from "../screens/MainScreen/MainScreen";
import ProtectedRoute from "./ProtectedRoute";
const Navigation:FC = (props) =>
{
    
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify" element={
                <ProtectedRoute>
                    <ChangePassword/>
                </ProtectedRoute>
                } />
                <Route path="/home" element={
                    <ProtectedRoute>
                    <MainScreen />
                </ProtectedRoute>
                } />
                <Route path="/account" element={
                    <ProtectedRoute>
                    <AccountDetails />
                </ProtectedRoute>
                } />
                
            </Routes>
            
        </Router>
        
    );
}

export default Navigation;