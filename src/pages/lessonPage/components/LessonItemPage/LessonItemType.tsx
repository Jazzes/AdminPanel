import React, {FC, useState} from 'react';
import {LessonTypeApi} from "../../../../store/services/LessonTypeApiService";
import {ILessonItem} from "./LessonItemForm";

const LessonItemType : FC<ILessonItem> = ({lesson, wasChanges}) => {

    const {data: lessonTypes} = LessonTypeApi.useFetchAllLessonTypesQuery('')
    const [lessonTypeId, setLessonTypeId] = useState(lesson.lesson.lesson_type_id)

    return (
        <>
            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">Тип</div>
                <input style={{display: "none"}} name="lesson_type_id" type="text" value={lessonTypeId}
                       onChange={() => {
                       }}/>
                <div className="LessonItemPage__form__item__column">
                    {lessonTypes &&
                        lessonTypes.rows.map(lesson =>
                            <div className="LessonItemPage__form__item__column__item" onClick={() => {
                                wasChanges.current = true
                                setLessonTypeId(lesson.id)
                            }} key={lesson.id}>
                                <div
                                    className={lesson.id === lessonTypeId ? "LessonItemPage__form__item_column__circle_green" : "LessonItemPage__form__item_column__circle"}/>
                                <div style={{marginLeft: 5}}>
                                    {lesson.name}
                                </div>
                            </div>
                        )}
                </div>
            </div>
            {lessonTypeId === 3 &&
                <>
                    <div className="LessonItemPage__form__item">
                        <div className="LessonItemPage__form__item_text">Длина вдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="inhale"
                               onChange={() => {
                                   wasChanges.current = true
                               }} defaultValue={lesson.lesson.anim.inhale}
                               className="LessonItemPage__form__item_input"/>
                    </div>
                    <div className="LessonItemPage__form__item">
                        <div className="LessonItemPage__form__item_text">Длина задержки после вдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="inh_delay"
                               onChange={() => {
                                   wasChanges.current = true
                               }} defaultValue={lesson.lesson.anim.inh_delay}
                               className="LessonItemPage__form__item_input"/>
                    </div>
                    <div className="LessonItemPage__form__item">
                        <div className="LessonItemPage__form__item_text">Длина выдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="exhalation"
                               onChange={() => {
                                   wasChanges.current = true
                               }} defaultValue={lesson.lesson.anim.exhalation}
                               className="LessonItemPage__form__item_input"/>
                    </div>
                    <div className="LessonItemPage__form__item">
                        <div className="LessonItemPage__form__item_text">Длины задержки после выдоха</div>
                        <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="exh_delay"
                               onChange={() => {
                                   wasChanges.current = true
                               }} defaultValue={lesson.lesson.anim.exh_delay}
                               className="LessonItemPage__form__item_input"/>
                    </div>
                </>
            }
        </>
    );
};

export default LessonItemType;