import React, {FC} from 'react';
import {ILessonTypeItemPageWithChanges} from "../../LessonTypeItemPage";

const LessonTypeItemInfoLeft : FC<ILessonTypeItemPageWithChanges> = ({wasChanges, lessonType}) => {
    return (
        <>
            <div className="LessonTypeItemPage__form__item">
                <div className="LessonTypeItemPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} defaultValue={lessonType.name} className="LessonTypeItemPage__form__item_input"/>
            </div>

            <div className="LessonTypeItemPage__form__item">
                <div className="LessonTypeItemPage__form__item_text">
                    Путь
                </div>
                <input autoComplete={"off"} required name="path"
                       onChange={() => {
                           wasChanges.current = true
                       }} defaultValue={lessonType.path} className="LessonTypeItemPage__form__item_input"/>
            </div>
        </>
    );
};

export default LessonTypeItemInfoLeft;