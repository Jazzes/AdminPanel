import React, {FC, useState} from 'react';
import {IAudioAdd} from "../../AudioAddPage";

const AudioAddType : FC<IAudioAdd>= ({wasChanges}) => {
    const [value, setValue] = useState('')

    const hints = ['cover', 'audio', 'improvisation']

    return (
        <div className="AudioAddPage__form__item">
            <div className="AudioAddPage__form__item_text">
                Тип
            </div>
            <div className="AudioAddPage__form__item_column">
                <input autoComplete={"off"} required name="type" value={value}
                       onChange={(e) => {
                           setValue(e.target.value)
                           wasChanges.current = true
                       }} className="AudioAddPage__form__item_input"/>

                <div className="AudioAddPage__form__item_row">

                    {hints.map((ent) =>
                        <div className="AudioAddPage__form__item__autoinput" onClick={() => {
                            setValue(ent)
                        }} key={ent}>{ent}</div>
                    )}

                </div>


            </div>

        </div>
    );
};

export default AudioAddType;