import React, {FC, FormEvent, useRef} from 'react';
import {BeatEntity, Lesson, mp4LessonEntity} from "../../../../models/Models";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import LessonItemInfo from "./LessonItemInfo";
import LessonItemNoteChars from "./LessonItemNoteChars";
import {ILessonOneResponse} from "../../../../models/StoreModels";
import LessonItemButtons from "./LessonItemButtons";
import {LessonApi} from "../../../../store/services/LessonApiService";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import FetchLoading from "../../../../components/Loading/FetchLoading";
export interface ILessonItemForm{
    lesson: ILessonOneResponse
}
export interface ILessonItem{
    wasChanges: React.MutableRefObject<boolean>
    lesson: ILessonOneResponse
}

const LessonItemForm : FC<ILessonItemForm> = ({lesson}) => {

    const wasChanges = useRef(false)
    const [changeLesson, {isLoading: changeLoading}] = LessonApi.useChangeLessonMutation()
    const [changeLinks, {isLoading: changeLinksLoading}] = LessonApi.useChangeLessonLinksMutation()
    const [changeGenresLink, {isLoading: changeGenresLinkLoading}] = LessonApi.useChangeGenreLessonLinksMutation()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (wasChanges.current) {
            const beatsForm: BeatEntity[] = []
            const mp4Youtube: mp4LessonEntity[] = []
            const form = e.currentTarget
            const formData = new FormData(form)
            const formJson = Object.fromEntries(formData.entries())

            let i = 0
            while (formJson[`num${i}`] === "" || formJson[`num${i}`]) {
                beatsForm.push({
                    num: Number(formJson[`num${i}`]) || formJson[`num${i}`] === "0" ? Number(formJson[`num${i}`]) : null,
                    num_l: Number(formJson[`num_l${i}`]) || formJson[`num_l${i}`] === "0" ? Number(formJson[`num_l${i}`]) : null,
                    num_r: Number(formJson[`num_r${i}`]) || formJson[`num_r${i}`] === "0" ? Number(formJson[`num_r${i}`]) : null,
                    accent: Number(formJson[`num${i}`]) || formJson[`num${i}`] === "0" ? !!Number(formJson[`accent${i}`]) : false
                })
                ++i
            }
            i = 0
            while (formJson[`mp4_youtube_name_${i}`] === "" || formJson[`mp4_youtube_name_${i}`]) {
                mp4Youtube.push({
                    name: String(formJson[`mp4_youtube_name_${i}`]),
                    path: String(formJson[`mp4_youtube_path_${i}`]),
                    preview: String(formJson[`mp4_youtube_preview_${i}`])
                })
                ++i
            }

            const newJson: Lesson = {
                id: lesson.lesson.id,
                name: String(formJson.name),
                subtitle: String(formJson.subtitle),
                l_tact: Number(formJson.l_tact),
                l_square: Number(formJson.l_square),
                l_beat: Number(formJson.l_beat),
                bpm: Number(formJson.bpm),
                img: String(formJson.img),
                mp3: {
                    mp3_fimbo: String(formJson.mp3_fimbo),
                    mp3_tact: String(formJson.mp3_tact),
                    mp3_square: String(formJson.mp3_square),
                    mp4_youtube: mp4Youtube,
                    mp3_yandex: String(formJson.mp3_yandex)
                },
                beats: beatsForm,
                path: String(formJson.path),
                anim: {
                    inhale: Number(formJson.inhale),
                    inh_delay: Number(formJson.inh_delay),
                    exhalation: Number(formJson.exhalation),
                    exh_delay: Number(formJson.exh_delay)
                },
                lesson_type_id: Number(formJson.lesson_type_id),
                visible: formJson.visible === "1",
                position: Number(formJson.position)
            }

            changeLesson(newJson).then(async (result) => {
                const success = result as { data: Lesson }
                if (success.data) {
                    const connected_fimbos = String(formJson.connected_fimbos).split(',').map(ent => Number(ent)).filter(ent => ent !== 0)
                    await changeLinks({
                        fimbos: connected_fimbos,
                        lesson_id: success.data.id
                    })
                    const connected_genres = String(formJson.connected_genres).split(',').map(ent => Number(ent)).filter(ent => ent !== 0)
                    await changeGenresLink({
                        lesson_id: success.data.id,
                        genres: connected_genres
                    })
                    dispatch(successShow(true))
                    setTimeout(() => {
                        dispatch(successShow(false))
                    }, 5000)
                    wasChanges.current = false
                } else {
                    dispatch(errorShow(true))
                    setTimeout(() => {
                        dispatch(errorShow(false))
                    }, 5000)
                }
            })
        }
    }

    return (
        <div className="LessonItemPage__container">
            <ButtonBack wasChanges={wasChanges}/>
            <form className="LessonItemPage__form" onSubmit={handleSubmit}>
                <div className="LessonItemPage__form_left">
                    <LessonItemInfo lesson={lesson} wasChanges={wasChanges}/>
                </div>
                <div className="LessonItemPage__form_right">
                    <LessonItemNoteChars lesson={lesson} wasChanges={wasChanges}/>
                </div>
                <LessonItemButtons/>
            </form>

            {(changeLoading || changeLinksLoading || changeGenresLinkLoading) &&
                <FetchLoading/>
            }
        </div>
    );
};

export default LessonItemForm;