import React, {FC, useState} from 'react';
import {ILessonTypeItemPageWithChanges} from "../../LessonTypeItemPage";

const LessonTypeItemInfoRight : FC<ILessonTypeItemPageWithChanges> = ({lessonType, wasChanges}) => {
    const [visible, setVisible] = useState(lessonType.visible)

    return (
        <div className="LessonTypeItemPage__form__item">
            <div className="LessonTypeItemPage__form__item_text">Видимость</div>
            <input style={{display: "none"}} name="visible" type="number" value={Number(visible)}
                   onChange={() => {
                   }}/>
            <div className="LessonTypeItemPage__form__item__column">
                <div className="LessonTypeItemPage__form__item__column__item" onClick={() => {
                    setVisible(true)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonTypeItemPage__form__item_column__circle_green" : "LessonTypeItemPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Показывать</div>
                </div>

                <div className="LessonTypeItemPage__form__item__column__item" onClick={() => {
                    setVisible(false)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonTypeItemPage__form__item_column__circle" : "LessonTypeItemPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Скрыть</div>
                </div>

            </div>
        </div>
    );
};

export default LessonTypeItemInfoRight;