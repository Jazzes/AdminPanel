import React, {FormEvent, useRef} from 'react';
import "./LessonTypeAddPage.scss"
import {errorSlice, successSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import {LessonTypeApi} from "../../store/services/LessonTypeApiService";
import {LessonType} from "../../models/Models";
import ButtonBack from "../../components/Buttons/ButtonBack";
import LessonTypeAddInfoLeft from "./components/LessonTypeAddPage/LessonTypeAddInfoLeft";
import LessonTypeAddInfoRight from "./components/LessonTypeAddPage/LessonTypeAddInfoRight";

export interface ILessonTypeAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const LessonTypeAddPage = () => {

    const [createLessonType] = LessonTypeApi.useCreateLessonTypeMutation()
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


        let newJson: LessonType = {
            id: 0,
            name: String(formJson.name),
            path: String(formJson.path),
            visible: formJson.visible === "1",
        }

        createLessonType(newJson).then(async (result) => {
            const success = result as { data: LessonType }
            if (success.data) {
                dispatch(successShow(true))
                setTimeout(() => {
                    dispatch(successShow(false))
                }, 5000)
                navigate('/lesson-type')
            } else {
                dispatch(errorShow(true))
                setTimeout(() => {
                    dispatch(errorShow(false))
                }, 5000)
            }
        })
    }

    return (
        <div className="LessonTypeAddPage__container">
            <ButtonBack wasChanges={wasChanges}/>
            <form className="LessonTypeAddPage__form" onSubmit={handleSubmit}>
                <div className="LessonTypeAddPage__form_left">
                    <LessonTypeAddInfoLeft wasChanges={wasChanges}/>
                </div>
                <div className="LessonTypeAddPage__form_right">
                    <LessonTypeAddInfoRight wasChanges={wasChanges}/>
                </div>

                <button className="LessonTypeAddPage__form__button" type='submit'>Добавить</button>
            </form>
        </div>
    );
};

export default LessonTypeAddPage;