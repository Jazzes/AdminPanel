import React, {FC, useState} from 'react';
import {AudioItemWithChange} from "../../AudioItemPage";

const AudioItemType : FC<AudioItemWithChange>= ({audio, wasChanges}) => {
    const [value, setValue] = useState(audio.type)

    const hints = ['cover', 'audio', 'improvisation']

    return (
        <div className="AudioItemPage__form__item">
            <div className="AudioItemPage__form__item_text">
                Тип
            </div>
            <div className="AudioItemPage__form__item_column">
                <input autoComplete={"off"} required name="type" value={value}
                       onChange={(e) => {
                           setValue(e.target.value)
                           wasChanges.current = true
                       }} className="AudioItemPage__form__item_input"/>

                <div className="AudioItemPage__form__item_row">

                    {hints.map((ent) =>
                        <div className="AudioItemPage__form__item__autoinput" onClick={() => {
                            setValue(ent)
                        }} key={ent}>{ent}</div>
                    )}

                </div>


            </div>

        </div>
    );
};

export default AudioItemType;