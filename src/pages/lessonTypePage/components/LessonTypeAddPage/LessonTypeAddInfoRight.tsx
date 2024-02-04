import React, {FC, useState} from 'react';
import {ILessonTypeAdd} from "../../LessonTypeAddPage";

const LessonTypeAddInfoRight : FC<ILessonTypeAdd> = ({wasChanges}) => {
    const [visible, setVisible] = useState(true)

    return (
        <div className="LessonTypeAddPage__form__item">
            <div className="LessonTypeAddPage__form__item_text">Видимость</div>
            <input style={{display: "none"}} name="visible" type="number" value={Number(visible)}
                   onChange={() => {
                   }}/>
            <div className="LessonTypeAddPage__form__item__column">
                <div className="LessonTypeAddPage__form__item__column__item" onClick={() => {
                    setVisible(true)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonTypeAddPage__form__item_column__circle_green" : "LessonTypeAddPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Показывать</div>
                </div>

                <div className="LessonTypeAddPage__form__item__column__item" onClick={() => {
                    setVisible(false)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonTypeAddPage__form__item_column__circle" : "LessonTypeAddPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Скрыть</div>
                </div>

            </div>
        </div>
    );
};

export default LessonTypeAddInfoRight;