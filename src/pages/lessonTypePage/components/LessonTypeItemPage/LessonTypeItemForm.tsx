import React, {FC, FormEvent, useRef} from 'react';
import {ILessonTypeItemPage} from "../../LessonTypeItemPage";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {LessonTypeApi} from "../../../../store/services/LessonTypeApiService";
import {LessonType} from "../../../../models/Models";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import LessonTypeItemInfoLeft from "./LessonTypeItemInfoLeft";
import LessonTypeItemInfoRight from "./LessonTypeItemInfoRight";
import LessonTypeItemButtons from "./LessonTypeItemButtons";

const LessonTypeItemForm : FC<ILessonTypeItemPage> = ({lessonType}) => {
    const [changeLessonType, {isLoading}] = LessonTypeApi.useChangeLessonTypeMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        let newJson: LessonType = {
            id: lessonType.id,
            name: String(formJson.name),
            path: String(formJson.path),
            visible: formJson.visible === "1",
        }

        changeLessonType(newJson).then(async (result) => {
            const success = result as {data: LessonType}
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
            <div className="LessonTypeItemPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="LessonTypeItemPage__form" onSubmit={handleSubmit}>
                    <div className="LessonTypeItemPage__form_left">
                        <LessonTypeItemInfoLeft wasChanges={wasChanges} lessonType={lessonType}/>
                    </div>
                    <div className="LessonTypeItemPage__form_right">
                        <LessonTypeItemInfoRight wasChanges={wasChanges} lessonType={lessonType}/>
                    </div>
                    <LessonTypeItemButtons/>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default LessonTypeItemForm;