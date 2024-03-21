import React, {FC, useState} from 'react';
import {AudioItemWithChange} from "../../AudioItemPage";

const AudioItemVisible : FC<AudioItemWithChange>= ({audio, wasChanges}) => {
    const [visible, setVisible] = useState(audio.visible)

    return (
        <div className="AudioItemPage__form__item">
            <div className="AudioItemPage__form__item_text">Видимость</div>
            <input style={{display: "none"}} name="visible" type="number" value={Number(visible)}
                   onChange={() => {
                   }}/>
            <div className="AudioItemPage__form__item__column">
                <div className="AudioItemPage__form__item__column__item" onClick={() => {
                    setVisible(true)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "AudioItemPage__form__item_column__circle_green" : "AudioItemPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Показывать</div>
                </div>

                <div className="AudioItemPage__form__item__column__item" onClick={() => {
                    setVisible(false)
                    wasChanges.current = true
                }}>
                    <div className={visible ? "AudioItemPage__form__item_column__circle" : "AudioItemPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Скрыть</div>
                </div>

            </div>
        </div>
    );
};

export default AudioItemVisible;