import React, {FormEvent, useRef} from 'react';
import "./SoulAddPage.scss"
import SoulAddInfoRight from "./components/SoulAddPage/SoulAddInfoRight";
import ButtonBack from "../../components/Buttons/ButtonBack";
import SoulAddInfoLeft from "./components/SoulAddPage/SoulAddInfoLeft";
import Loading from "../../components/Loading/Loading";
import {Soul} from "../../models/Models";
import {errorSlice, successSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import FetchLoading from "../../components/Loading/FetchLoading";
import {SoulApi} from "../../store/services/SoulOptionApiService";

const SoulAddPage = () => {

    const [createSoul, {isLoading}] = SoulApi.useCreateSoulMutation()
    const [createLinks, {isLoading: isLoadingLinks}] = SoulApi.useAddSoulFimboLinksMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        const newJson: Soul = {
            id: 0,
            additional_info: String(formJson.additional_info),
            block: String(formJson.block),
            text: String(formJson.text),
            position_weight: Number(formJson.position_weight)
        }

        createSoul(newJson).then(async (result) => {
            const success = result as { data: Soul }
            if (success.data) {
                const connected_fimbos = String(formJson.connected_fimbos).split(',').map(ent => Number(ent)).filter(ent => ent !== 0)
                await createLinks({
                    fimbos: connected_fimbos,
                    soul_option_id: success.data.id
                })
                dispatch(successShow(true))
                setTimeout(() => {
                    dispatch(successShow(false))
                }, 5000)
                navigate('/soul')
            } else {
                dispatch(errorShow(true))
                setTimeout(() => {
                    dispatch(errorShow(false))
                }, 5000)
            }
        })
    }


    return (
        <>
            {isLoading ?
                <Loading/>
                :
                <div className="SoulAddPage__container">
                    <ButtonBack wasChanges={wasChanges}/>
                    <form className="SoulAddPage__form" onSubmit={handleSubmit}>
                        <div className="SoulAddPage__form_left">
                            <SoulAddInfoLeft wasChanges={wasChanges}/>
                        </div>
                        <div className="SoulAddPage__form_right">
                            <SoulAddInfoRight wasChanges={wasChanges}/>
                        </div>

                        <button className="SoulAddPage__form__button" type='submit'>Добавить</button>
                    </form>
                </div>
            }
            {(isLoadingLinks) &&
                <FetchLoading/>
            }
        </>
    );
};

export default SoulAddPage;