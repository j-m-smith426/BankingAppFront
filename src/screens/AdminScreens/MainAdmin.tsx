import classes from './MainAdmin.module.css'
import { FC, FormEvent, useState } from 'react';
import CustomerLookup from '../../components/AdminComponents/CustomerLookup';
import CustomerResult from '../../components/AdminComponents/CustomerResult';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../redux/Store';
import Loading from '../../components/Loading/Loading';
import CustomerAdd from '../../components/AdminComponents/CustomerAdd';

const MainAdmin:FC = (props) =>
{
    const status = useSelector((state:IStoreState) => state.customer.status)
    const customer = useSelector((state: IStoreState) => state.customer.customer)
    const [pid, setPid] = useState(0);
    return (
        <div className="workspace">
            {status === "loading" && <Loading />}
            {customer.customerUniqueID === 0 && status === 'idle' && <CustomerLookup setPid={setPid}/>}
            {customer.customerUniqueID === 0 && status === 'failed' && <CustomerAdd pid={pid}/>}
            {status === "succeeded" && <CustomerResult />}
        </div>
    );
}

export default MainAdmin;