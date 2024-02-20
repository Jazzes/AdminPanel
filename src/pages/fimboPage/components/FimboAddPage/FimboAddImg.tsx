import React, {FC, useState} from 'react';
import {IFimboAdd} from "../../FimboAddPage";
import {FimboAdditionalImg} from "../../../../models/Models";

const FimboAddImg : FC<IFimboAdd>= ({wasChanges}) => {
    const [img_add, setImg_add] = useState<FimboAdditionalImg[]>([{path: ""}])

    const addEntityImg = () => {
        setImg_add([...img_add, {path: ""}])
    }

    const deleteEntityImg = () => {
        let p = [...img_add]
        p.pop()
        setImg_add(p)
    }

    return (
        <>
            {img_add.map((_ent, index) =>
                <div key={index} className="FimboAddPage__form__item__mp4">
                    <div className="FimboAddPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboAddPage__form__item_text">№{index + 1} Путь доп. <br/>картинки
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"img_additional_path_" + index}
                               className="FimboAddPage__form__item_input"></input>
                    </div>
                </div>
            )}

            <div className="FimboAddPage__form__item__plusMinus">
                <div className="FimboAddPage__form__item__plusMinus__plus" onClick={() => {
                    addEntityImg()
                }}>
                    +
                </div>
                {img_add.length > 1 &&
                    <div className="FimboAddPage__form__item__plusMinus__minus" onClick={() => {
                        deleteEntityImg()
                    }}>
                        -
                    </div>
                }
            </div>
        </>
    );
};

export default FimboAddImg;