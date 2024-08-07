import React, {FC, useState} from 'react';
import {IFimboAdd} from "../../FimboAddPage";

const FimboAddAutotextDesign : FC<IFimboAdd> = ({wasChanges}) => {
    const [text, setText] = useState<string[]>([''])

    const addEntity = () => {
        setText([...text, ''])
    }

    const deleteEntity = () => {
        let p = [...text]
        p.pop()
        setText(p)
    }


    return (
        <>
            {text.map((_ent, index) =>
                <div key={index} className="FimboAddPage__form__item__i">
                    <div className="FimboAddPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboAddPage__form__item_text">№{index + 1} Автотекст дизайна
                        </div>
                        <textarea wrap="soft" autoComplete={"off"} onChange={() => { // ТЕКСТ АРЕА СДЕЛАТЬ
                            wasChanges.current = true
                        }} name={"text_reason_design_" + index}
                               className="FimboAddPage__form__item_textarea"></textarea>
                    </div>
                </div>
            )}

            <div className="hint__description__field">
                Текст, который покажется в случае, если человек лайкнул дизайн инструмента в выборе Фимбо.
            </div>

            <div className="FimboAddPage__form__item__plusMinus" style={{marginTop: "3px"}}>
                <div className="FimboAddPage__form__item__plusMinus__plus" onClick={() => {
                    addEntity()
                }}>
                    +
                </div>
                {text.length > 1 &&
                    <div className="FimboAddPage__form__item__plusMinus__minus" onClick={() => {
                        deleteEntity()
                    }}>
                        -
                    </div>
                }
            </div>
        </>
    );
};

export default FimboAddAutotextDesign;