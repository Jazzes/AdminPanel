import React, {FC, useState} from 'react';
import {IAudioAdd} from "../../AudioAddPage";

const AudioAddVisible : FC<IAudioAdd> = ({wasChanges}) => {
    const [visible, setVisible] = useState(true)

    return (
        <div className="AudioAddPage__form__item">
            <div className="AudioAddPage__form__item_text">Видимость</div>
            <input style={{display: "none"}} name="visible" type="number" value={Number(visible)}
                   onChange={() => {
                   }}/>
            <div className="AudioAddPage__form__item__column">
                <div className="AudioAddPage__form__item__column__item" onClick={() => {
                    setVisible(true)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "AudioAddPage__form__item_column__circle_green" : "AudioAddPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Показывать</div>
                </div>

                <div className="AudioAddPage__form__item__column__item" onClick={() => {
                    setVisible(false)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "AudioAddPage__form__item_column__circle" : "AudioAddPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Скрыть</div>
                </div>

            </div>
        </div>
    );
};

export default AudioAddVisible;