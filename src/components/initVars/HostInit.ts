import {useAppDispatch} from "../../store/hooks/redux";
import {hostSlice} from "../../store/reducer/Host";
import axios from "axios";
import {hostURL} from "../../http/urls";
import {getCookie} from "../../http/cookies";

export const HostInit = async () => {
    const dispatch = useAppDispatch()
    const {setFilesHost} = hostSlice.actions
    const tokenCookie = getCookie("token")
    try {
        const response = (await axios.get(hostURL, {
                headers: {
                    Authorization: `Bearer ${tokenCookie}`
                }
            }
        )).data.value_of
        dispatch(setFilesHost(response))
    } catch (e) {
    }
}