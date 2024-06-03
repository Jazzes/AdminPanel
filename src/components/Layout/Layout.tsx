import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import "./Layout.scss"
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {userSlice} from "../../store/reducer/UserSlice";
import {clearCookie} from "../../http/cookies";
import MessagesBlock from "../Messages/MessagesBlock";

const Layout = () => {
    const dispatch = useAppDispatch()
    const {LogOut} = userSlice.actions
    const {login} = useAppSelector(state => state.userReducer)

    return (
        <>
            <div className="nav">
                <div className="nav__itemWrapper">
                    <div className="nav__name">{login}</div>

                    <div className="nav__group">
                        <NavLink to="/lesson" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Lesson
                        </NavLink>
                        <NavLink to="/fimbo" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Fimbo
                        </NavLink>
                        <NavLink to="/audio" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Audio
                        </NavLink>
                        <NavLink to="/lesson-type" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Lesson Type
                        </NavLink>
                        <NavLink to="variable" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Variable
                        </NavLink>
                        <NavLink to="genre" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Genre
                        </NavLink>
                        <NavLink to="soul" className={({isActive}) =>
                            ["nav__item", isActive ? "nav__activeLink" : ""].join(" ")
                        }>
                            Soul
                        </NavLink>
                    </div>

                    <div className="nav__logout" onClick={() => {
                        clearCookie("token")
                        dispatch(LogOut())
                    }}>Выйти</div>
                </div>
            </div>

            <MessagesBlock/>

            <Outlet/>
        </>
    );
};

export default Layout;