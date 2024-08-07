import React, {FC, useState} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";

const FimboItemAutotextDesign : FC<FimboItemWithChange> = ({fimbo, wasChanges}) => {
    const [text, setText] = useState<string[]>(fimbo.text_reason_design ? (fimbo.text_reason_design.length > 0 ? fimbo.text_reason_design : [""]) : [""])

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
            {text.map((ent, index) =>
                <div key={index} className="FimboItemPage__form__item__i">
                    <div className="FimboItemPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboItemPage__form__item_text">№{index + 1} Автотекст дизайна
                        </div>
                        <textarea wrap="soft" autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"text_reason_design_" + index} defaultValue={ent}
                               className="FimboItemPage__form__item_textarea"></textarea>
                    </div>
                </div>
            )}

            <div className="hint__description__field">
                Текст, который покажется в случае, если человек лайкнул дизайн инструмента в выборе Фимбо.
            </div>

            <div className="FimboItemPage__form__item__plusMinus" style={{marginTop: "3px"}}>
                <div className="FimboItemPage__form__item__plusMinus__plus" onClick={() => {
                    addEntity()
                }}>
                    +
                </div>
                {text.length > 1 &&
                    <div className="FimboItemPage__form__item__plusMinus__minus" onClick={() => {
                        deleteEntity()
                    }}>
                        -
                    </div>
                }
            </div>
        </>
    );
};

export default FimboItemAutotextDesign;