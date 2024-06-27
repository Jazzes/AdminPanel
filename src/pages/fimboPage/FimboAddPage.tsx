import React, {FormEvent, useRef} from 'react';
import "./FimboAddPage.scss"
import {errorSlice, successSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import {Fimbo, FimboAdditionalImg, FimboNotes, FimboVideoEntity, LepestEntity} from "../../models/Models";
import ButtonBack from "../../components/Buttons/ButtonBack";
import FetchLoading from "../../components/Loading/FetchLoading";
import {FimboApi} from "../../store/services/FimboApiService";
import FimboAddInfoLeft from "./components/FimboAddPage/FimboAddInfoLeft";
import FimboAddInfoRight from "./components/FimboAddPage/FimboAddInfoRight";
export interface IFimboAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const FimboAddPage = () => {
    const [createFimbo, {isLoading}] = FimboApi.useCreateFimboMutation()
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

        const notes: FimboNotes = {
            size22: [],
            size27: [],
            size32: []
        }
        for (let key in formJson) {
            if (key.substring(0, 11) === "fimnote22cm") {
                notes.size22.push({note: key.substring(12, key.length), file_sound: String(formJson[key])})
            } else if (key.substring(0, 11) === "fimnote27cm") {
                notes.size27.push({note: key.substring(12, key.length), file_sound: String(formJson[key])})
            } else if (key.substring(0, 11) === "fimnote32cm") {
                notes.size32.push({note: key.substring(12, key.length), file_sound: String(formJson[key])})
            }
        }

        const img_additional: FimboAdditionalImg[] = []
        let i = 0
        while (formJson[`img_additional_path_${i}`] === "" || formJson[`img_additional_path_${i}`]) {
            img_additional.push({
                path: String(formJson[`img_additional_path_${i}`])
            })
            ++i
        }

        const videos_f: FimboVideoEntity[] = []
        let z = 0
        while (formJson[`videos_path_${z}`] === "" || formJson[`videos_path_${z}`]) {
            videos_f.push({
                path: String(formJson[`videos_path_${z}`]),
                preview: String(formJson[`videos_preview_${z}`]),
            })
            ++z
        }

        const lepest: LepestEntity[] = []
        for (let i = 1; i < 11; ++i) {
            lepest.push({
                lep: `${i}`,
                transform: String(formJson[`lep${i}_transform`]),
                width: String(formJson[`lep${i}_width`]),
                height: String(formJson[`lep${i}_height`]),
                left: String(formJson[`lep${i}_left`]),
                top: String(formJson[`lep${i}_top`]),
                num_top: String(formJson[`lep${i}_num_top`]),
                num_left: String(formJson[`lep${i}_num_left`])
            })
        }

        const newJson: Fimbo = {
            id: 0,
            name: String(formJson.name),
            img: String(formJson.img),
            img_listen: String(formJson.img_listen),
            img_additional: img_additional,
            video: videos_f,
            buy_url: String(formJson.buy_url),
            purchase: formJson.purchase === "1",
            path: String(formJson.path),
            notes,
            background_first_color: String(formJson.background_first_color),
            background_second_color: String(formJson.background_second_color),
            note_default_color: String(formJson.note_default_color),
            note_first_color: String(formJson.note_first_color),
            note_second_color: String(formJson.note_second_color),
            position: Number(formJson.position),
            priority_weight: Number(formJson.priority_weight),
            lepest
        }

        createFimbo(newJson).then(async (result) => {
            const success = result as {data: Fimbo}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/fimbo')
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
            <div className="FimboAddPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="FimboAddPage__form" onSubmit={handleSubmit}>
                    <div className="FimboAddPage__form_left">
                        <FimboAddInfoLeft wasChanges={wasChanges}/>
                    </div>
                    <div className="FimboAddPage__form_right">
                        <FimboAddInfoRight wasChanges={wasChanges}/>
                    </div>

                    <button className="FimboAddPage__form__button" type='submit'>Добавить</button>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default FimboAddPage;