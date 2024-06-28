import React, {FormEvent, useRef} from 'react';
import './AudioAddPage.scss'
import {errorSlice, successSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import {Audio} from "../../models/Models";
import ButtonBack from "../../components/Buttons/ButtonBack";
import FetchLoading from "../../components/Loading/FetchLoading";
import {AudioApi} from "../../store/services/AudioApiService";
import AudioAddInfoLeft from "./components/AudioAddPage/AudioAddInfoLeft";
import AudioAddInfoRight from "./components/AudioAddPage/AudioAddInfoRight";

export interface IAudioAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const AudioAddPage = () => {
    const [createAudio, {isLoading}] = AudioApi.useCreateAudioMutation()
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

        const newJson: Audio = {
            id: 0,
            name: String(formJson.name),
            img: String(formJson.img),
            path: String(formJson.path),
            position_weight: Number(formJson.position_weight),
            type: String(formJson.type),
            fimbo_size: String(formJson.fimbo_size),
            visible: formJson.visible === "1",
            fimbo_id: Number(formJson.fimbo_id),
            mp3_path: String(formJson.mp3_path),
        }

        createAudio(newJson).then(async (result) => {
            const success = result as {data: Audio}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/audio')
            } else{
                dispatch(errorShow( true))
                setTimeout(() => {
                    dispatch(errorShow( false))
                }, 5000)
            }
        })
    }


    return (
        <>
            <div className="AudioAddPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="AudioAddPage__form" onSubmit={handleSubmit}>
                    <div className="AudioAddPage__form_left">
                        <AudioAddInfoLeft wasChanges={wasChanges}/>
                    </div>
                    <div className="AudioAddPage__form_right">
                        <AudioAddInfoRight wasChanges={wasChanges}/>
                    </div>

                    <button className="AudioAddPage__form__button" type='submit'>Добавить</button>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default AudioAddPage;