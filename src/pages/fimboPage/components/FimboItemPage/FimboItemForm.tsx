import React, {FC, FormEvent, memo, useRef} from 'react';
import {FimboItem} from "../../FimboItemPage";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {FimboApi} from "../../../../store/services/FimboApiService";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Fimbo, LepestEntity, NoteEntity} from "../../../../models/Models";
import FimboItemInfoLeft from "./FimboItemInfoLeft";
import FimboItemInfoRight from "./FimboItemInfoRight";
import FimboItemButtons from "./FimboItemButtons";



const FimboItemForm: FC<FimboItem> = memo(({fimbo}) => {

    const [changeFimbo, {isLoading}] = FimboApi.useChangeFimboMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        const notes: NoteEntity[] = []
        for (let key in formJson) {
            if (key.substring(0, 7) === "fimnote") {
                notes.push({note: key.substring(8, key.length), file_sound: String(formJson[key])})
            }
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
            id: fimbo.id,
            name: String(formJson.name),
            img: String(formJson.img),
            img_resized: String(formJson.img_resized),
            buy_url: String(formJson.buy_url),
            path: String(formJson.path),
            notes,
            background_first_color: String(formJson.background_first_color),
            background_second_color: String(formJson.background_second_color),
            note_default_color: String(formJson.note_default_color),
            note_first_color: String(formJson.note_first_color),
            note_second_color: String(formJson.note_second_color),
            position: Number(formJson.position),
            lepest
        }

        changeFimbo(newJson).then(async (result) => {
            const success = result as {data: Fimbo}
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
            <div className="FimboItemPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="FimboItemPage__form" onSubmit={handleSubmit}>
                    <div className="FimboItemPage__form_left">
                        <FimboItemInfoLeft fimbo={fimbo} wasChanges={wasChanges}/>
                    </div>
                    <div className="FimboItemPage__form_right">
                        <FimboItemInfoRight fimbo={fimbo} wasChanges={wasChanges}/>
                    </div>
                    <FimboItemButtons/>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
})

export default FimboItemForm;