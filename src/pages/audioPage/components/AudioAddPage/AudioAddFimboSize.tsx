import React, {FC, useState} from 'react';
import {IAudioAdd} from "../../AudioAddPage";

const AudioAddFimboSize : FC<IAudioAdd>= ({wasChanges}) => {
    const [fsize, setFsize] = useState('27cm')

    const sizes = ['22cm', '27cm', '32cm']

    return (
        <div className="AudioAddPage__form__item">
            <div className="AudioAddPage__form__item_text">Размер</div>
            <input style={{display: "none"}} name="fimbo_size" value={fsize}
                   onChange={() => {}}/>
            <div className="AudioAddPage__form__item__column">
                {sizes.map((ent) =>
                        <div className="AudioAddPage__form__item__column__item" onClick={() => {
                            setFsize(ent)
                            wasChanges.current = true
                        }} key={ent}>
                            <div
                                className={(fsize === ent) ? "AudioAddPage__form__item_column__circle_green" : "AudioAddPage__form__item_column__circle"}></div>
                            <div style={{marginLeft: 5}}>{ent}</div>
                        </div>
                )}
            </div>
        </div>
    );
};

export default AudioAddFimboSize;