import {authURL} from "../../http/urls";
import {getCookie, setCookie} from "../../http/cookies";
import {useAppDispatch} from "../../store/hooks/redux";
import {userSlice} from "../../store/reducer/UserSlice";
import {jwtDecode} from "jwt-decode";
import {User} from "../../models/Models";
import axios from "axios";

export const UpdateAuth = async () => {
    const dispatch = useAppDispatch()
    const {LogIn} = userSlice.actions
    const tokenCookie = getCookie("token")
    if (tokenCookie) {
        const tokenDecoded: User = jwtDecode(tokenCookie)
        dispatch(LogIn(tokenDecoded))
        try {
            const response = (await axios.get(authURL, {
                    headers: {
                        Authorization: `Bearer ${tokenCookie}`
                    }
                }
            )).data.token
            setCookie("token", response, 172800)
        } catch (e) {
        }
    }
}