import React, {FC, FormEvent, useRef} from 'react';
import {AudioItem} from "../../AudioItemPage";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Audio} from "../../../../models/Models";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {AudioApi} from "../../../../store/services/AudioApiService";
import AudioItemButtons from "./AudioItemButtons";
import AudioItemInfoLeft from "./AudioItemInfoLeft";
import AudioItemInfoRight from "./AudioItemInfoRight";

const AudioItemForm :FC<AudioItem>= ({audio}) => {
    const [changeAudio, {isLoading}] = AudioApi.useChangeAudioMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        const newJson: Audio = {
            id: audio.id,
            name: String(formJson.name),
            img: String(formJson.img),
            path: String(formJson.path),
            position: Number(formJson.position),
            type: String(formJson.type),
            fimbo_size: String(formJson.fimbo_size),
            visible: formJson.visible === "1",
            fimbo_id: Number(formJson.fimbo_id),
            mp3_path: String(formJson.mp3_path),
        }

        changeAudio(newJson).then(async (result) => {
            const success = result as {data: Audio}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                wasChanges.current = false
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
            <div className="AudioItemPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="AudioItemPage__form" onSubmit={handleSubmit}>
                    <div className="AudioItemPage__form_left">
                        <AudioItemInfoLeft audio={audio} wasChanges={wasChanges}/>
                    </div>
                    <div className="AudioItemPage__form_right">
                        <AudioItemInfoRight audio={audio} wasChanges={wasChanges}/>
                    </div>
                    <AudioItemButtons/>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default AudioItemForm;