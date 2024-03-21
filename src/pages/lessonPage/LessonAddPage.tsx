import React, {FormEvent, useRef} from 'react';
import "./LessonAddPage.scss"
import LessonAddInfoRight from "./components/LessonAddPage/LessonAddInfoRight";
import ButtonBack from "../../components/Buttons/ButtonBack";
import LessonAddInfoLeft from "./components/LessonAddPage/LessonAddInfoLeft";
import {VariableApi} from "../../store/services/VariablesApiService";
import Loading from "../../components/Loading/Loading";
import {BeatEntity, Lesson, mp4LessonEntity} from "../../models/Models";
import axios from "axios";
import {getCookie} from "../../http/cookies";
import {lessonURL} from "../../http/urls";
import {LessonApi} from "../../store/services/LessonApiService";
import {errorSlice, successSlice, warningSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import FetchLoading from "../../components/Loading/FetchLoading";

const LessonAddPage = () => {

    const [createLesson, {isLoading: isLoadingLesson}] = LessonApi.useCreateLessonMutation()
    const [createLinks, {isLoading: isLoadingLinks}] = LessonApi.useAddLessonLinksMutation()
    const [createGenreLinks, {isLoading: isLoadingGenreLinks}] = LessonApi.useAddGenreLessonLinksMutation()
    const {data: variables, isLoading} = VariableApi.useFetchAllVariablesQuery('')
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {warningShow} = warningSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()


    const checkLessonPath = async (path: string) => {
        try {
            const response = await axios.get<Lesson[]>(`${lessonURL}/check-path/${path}`, {
                headers: {Authorization: `Bearer ${getCookie('token')}`}
            })
            return response.data as Array<Lesson>
        } catch (e: unknown) {
            return false
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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

        const checkPath = await checkLessonPath(String(formJson.path))

        if (checkPath !== false && checkPath.length !== 0) {
            dispatch(warningShow({show: true,
                message: "Некоторые уроки имеют такой же path. Следите за тем, чтобы path урока не повторялся у одного и того же Фимбо."}
            ))
            setTimeout(() => {
                dispatch(warningShow({show: false,
                    message: ""}
                ))
            }, 5000)
        }

        const newJson: Lesson = {
            id: 0,
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
            page_listen: formJson.page_listen === "1",
            position: Number(formJson.position)
        }

        createLesson(newJson).then(async (result) => {
            const success = result as {data: Lesson}
            if (success.data) {
                const connected_fimbos = String(formJson.connected_fimbos).split(',').map(ent => Number(ent)).filter(ent => ent !== 0)
                await createLinks({fimbos: connected_fimbos,
                    lesson_id: success.data.id})
                const connected_genres = String(formJson.connected_genres).split(',').map(ent => Number(ent)).filter(ent => ent !== 0)
                await createGenreLinks({genres: connected_genres,
                    lesson_id: success.data.id})
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/lesson')
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
            {isLoading ?
                <Loading/>
                :
                <>
                    {variables &&
                        <div className="LessonAddPage__container">
                            <ButtonBack wasChanges={wasChanges}/>
                            <form className="LessonAddPage__form" onSubmit={handleSubmit}>
                                <div className="LessonAddPage__form_left">
                                    <LessonAddInfoLeft variables={variables.rows} wasChanges={wasChanges}/>
                                </div>
                                <div className="LessonAddPage__form_right">
                                    <LessonAddInfoRight variables={variables.rows} wasChanges={wasChanges}/>
                                </div>

                                <button className="LessonAddPage__form__button" type='submit'>Добавить</button>
                            </form>
                        </div>
                    }
                </>
            }
            {(isLoadingLesson || isLoadingLinks || isLoadingGenreLinks) &&
                <FetchLoading/>
            }
        </>
    );
};

export default LessonAddPage;