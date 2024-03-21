import React, {FC, useState} from 'react';
import {ILessonAdd} from "./LessonAddInfoLeft";


const LessonAddPageListen : FC<ILessonAdd>  = ({wasChanges}) => {

    const [visible, setVisible] = useState(false)

    return (
        <div className="LessonAddPage__form__item">
            <div className="LessonAddPage__form__item_text">Стр. слушать</div>
            <input style={{display: "none"}} name="page_listen" type="number" value={Number(visible)}
                   onChange={() => {
                   }}/>
            <div className="LessonAddPage__form__item__column">
                <div className="LessonAddPage__form__item__column__item" onClick={() => {
                    setVisible(true)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonAddPage__form__item_column__circle_green" : "LessonAddPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Показывать</div>
                </div>

                <div className="LessonAddPage__form__item__column__item" onClick={() => {
                    setVisible(false)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "LessonAddPage__form__item_column__circle" : "LessonAddPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Скрыть</div>
                </div>

            </div>
        </div>
    );
};

export default LessonAddPageListen;