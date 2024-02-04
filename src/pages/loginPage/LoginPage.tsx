import React, {useRef, useState} from 'react';
import "./LoginPage.scss"
import axios from "axios";
import {hostURL, loginURL} from "../../http/urls";
import {jwtDecode} from "jwt-decode";
import {User} from "../../models/Models";
import {setCookie} from "../../http/cookies";
import {userSlice} from "../../store/reducer/UserSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {hostSlice} from "../../store/reducer/Host";

const LoginPage = () => {
    const [authMessage, setAuthMessage] = useState('')
    const [authError, setAuthError] = useState(false)
    const login = useRef('')
    const password = useRef('')
    const magic = useRef('')

    const {setFilesHost} = hostSlice.actions
    const {LogIn} = userSlice.actions
    const dispatch = useAppDispatch()

    const adminLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const token = (await axios.post(loginURL,
                {login: login.current, password: password.current, magic: magic.current})).data.token
            const userInformation: User = jwtDecode(token)
            if (userInformation.role === "ADMIN") {
                dispatch(LogIn(userInformation))
                setCookie("token", token, 172800)

                const hostFile = (await axios.get(hostURL, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )).data.value_of
                dispatch(setFilesHost(hostFile))
            } else {
                setAuthError(true);
                setAuthMessage("У вас нет прав.")
            }
        } catch (e: unknown) {
            setAuthError(true);
            setAuthMessage("Login, password или magic неверны.")
        }
    }

    return (
        <div className="loginShellWrapper">
            <div className="loginShell">
                <div className="loginShellText">Fimbo Development</div>
                <form className="loginShellForm" method="POST" onSubmit={adminLogin}>
                    <input type="text" placeholder="Login" className="loginShellInput" required
                           autoComplete="login" name='login'
                           onChange={(e) => {
                               login.current = e.target.value
                           }}/>
                    <input type="password" placeholder="Password" className="loginShellInput" required
                           autoComplete="current-password" name='password'
                           onChange={(e) => {
                               password.current = e.target.value
                           }}/>
                    <input type="text" placeholder="Magic" className="loginShellInput" required
                           autoComplete="magic" name='magic'
                           onChange={(e) => {
                               magic.current = e.target.value
                           }}/>
                    {authError &&
                        <div className="loginShellError">
                            {authMessage}
                        </div>
                    }
                    <button className="loginShellButton" type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;