import React, {FC, useState} from 'react';
import {LessonTypeApi} from "../../../../store/services/LessonTypeApiService";
import {ILessonAdd} from "./LessonAddInfo";

const LessonAddType: FC<ILessonAdd> = ({wasChanges}) => {

    const {data: lessonTypes} = LessonTypeApi.useFetchAllLessonTypesQuery('')
    const [lessonTypeId, setLessonTypeId] = useState(1)

    return (
        <>
            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">Тип</div>
                <input style={{display: "none"}} name="lesson_type_id" type="text" value={lessonTypeId}
                       onChange={() => {
                       }}/>
                <div className="LessonAddPage__form__item__column">
                    {lessonTypes &&
                        lessonTypes.rows.map(lesson =>
                            <div className="LessonAddPage__form__item__column__item" onClick={() => {
                                wasChanges.current = true
                                setLessonTypeId(lesson.id)
                            }} key={lesson.id}>
                                <div
                                    className={lesson.id === lessonTypeId ? "LessonAddPage__form__item_column__circle_green" : "LessonAddPage__form__item_column__circle"}/>
                                <div style={{marginLeft: 5}}>
                                    {lesson.name}
                                </div>
                            </div>
                        )}
                </div>
            </div>
            {lessonTypeId === 3 &&
                <>
                    <div className="LessonAddPage__form__item">
                        <div className="LessonAddPage__form__item_text">Начало вдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="inhale"
                               onChange={() => {
                                   wasChanges.current = true
                               }}
                               className="LessonAddPage__form__item_input"/>
                    </div>
                    <div className="LessonAddPage__form__item">
                        <div className="LessonAddPage__form__item_text">Задержка после вдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="inh_delay"
                               onChange={() => {
                                   wasChanges.current = true
                               }}
                               className="LessonAddPage__form__item_input"/>
                    </div>
                    <div className="LessonAddPage__form__item">
                        <div className="LessonAddPage__form__item_text">Начало выдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="exhalation"
                               onChange={() => {
                                   wasChanges.current = true
                               }}
                               className="LessonAddPage__form__item_input"/>
                    </div>
                    <div className="LessonAddPage__form__item">
                        <div className="LessonAddPage__form__item_text">Задержка после выдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="exh_delay"
                               onChange={() => {
                                   wasChanges.current = true
                               }}
                               className="LessonAddPage__form__item_input"/>
                    </div>
                </>
            }
        </>
    );
};

export default LessonAddType;