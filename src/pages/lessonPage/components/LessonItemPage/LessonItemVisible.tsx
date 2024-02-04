import React, {FC, useState} from 'react';
import {ILessonItem} from "./LessonItemForm";


const LessonItemVisible : FC<ILessonItem> = ({lesson, wasChanges}) => {

    const [visible, setVisible] = useState(lesson.lesson.visible)


    return (
        <div className="LessonItemPage__form__item">
            <div className="LessonItemPage__form__item_text">Видимость</div>
            <input style={{display: "none"}} name="visible" type="number" value={Number(visible)}
                   onChange={() => {
                   }}/>
            <div className="LessonItemPage__form__item__column">
                <div className="LessonItemPage__form__item__column__item" onClick={() => {
                    setVisible(true)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonItemPage__form__item_column__circle_green" : "LessonItemPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Показывать</div>
                </div>

                <div className="LessonItemPage__form__item__column__item" onClick={() => {
                    setVisible(false)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonItemPage__form__item_column__circle" : "LessonItemPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Скрыть</div>
                </div>

            </div>
        </div>
    );
};

export default LessonItemVisible;