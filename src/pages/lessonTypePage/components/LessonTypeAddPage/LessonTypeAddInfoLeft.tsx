import React, {FC} from 'react';
import {ILessonTypeAdd} from "../../LessonTypeAddPage";

const LessonTypeAddInfoLeft : FC<ILessonTypeAdd> = ({wasChanges}) => {
    return (
        <>
            <div className="LessonTypeAddPage__form__item">
                <div className="LessonTypeAddPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonTypeAddPage__form__item_input"/>
            </div>

            <div className="LessonTypeAddPage__form__item">
                <div className="LessonTypeAddPage__form__item_text">
                    Путь
                </div>
                <input autoComplete={"off"} required name="path"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonTypeAddPage__form__item_input"/>
            </div>
        </>
    );
};

export default LessonTypeAddInfoLeft;