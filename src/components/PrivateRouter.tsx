import React from 'react';
import {useAppSelector} from "../store/hooks/redux";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRouter = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)

    return (
        <>
            {isAuth ?
                <Outlet/>
                :
                <Navigate to="/"/>
            }
        </>
    );
};

export default PrivateRouter;