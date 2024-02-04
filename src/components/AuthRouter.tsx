import React from 'react';
import {useAppSelector} from "../store/hooks/redux";
import LoginPage from "../pages/loginPage/LoginPage";
import {Navigate} from "react-router-dom";

const AuthRouter = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    return (
        <>
            {isAuth ?
                <Navigate to={"/lesson"}/>
                :
                <LoginPage/>
            }
        </>
    );
};

export default AuthRouter;