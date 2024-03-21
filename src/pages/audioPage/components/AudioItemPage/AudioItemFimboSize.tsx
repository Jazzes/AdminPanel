import React, {FC, useState} from 'react';
import {AudioItemWithChange} from "../../AudioItemPage";

const AudioItemFimboSize : FC<AudioItemWithChange>= ({audio, wasChanges}) => {
    const [fsize, setFsize] = useState(audio.fimbo_size)

    const sizes = ['22cm', '27cm', '32cm']

    return (
        <div className="AudioItemPage__form__item">
            <div className="AudioItemPage__form__item_text">Размер</div>
            <input style={{display: "none"}} name="fimbo_size" value={fsize}
                   onChange={() => {}}/>
            <div className="AudioItemPage__form__item__column">
                {sizes.map((ent) =>
                    <div className="AudioItemPage__form__item__column__item" onClick={() => {
                        setFsize(ent)
                        wasChanges.current = true
                    }} key={ent}>
                        <div
                            className={(fsize === ent) ? "AudioItemPage__form__item_column__circle_green" : "AudioItemPage__form__item_column__circle"}></div>
                        <div style={{marginLeft: 5}}>{ent}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioItemFimboSize;