import React, {FC, useState} from 'react';
import {FimboAdditionalImg} from "../../../../models/Models";
import {FimboItemWithChange} from "../../FimboItemPage";

const FimboItemImg : FC<FimboItemWithChange>= ({wasChanges, fimbo}) => {
    const [img_add, setImg_add] = useState<FimboAdditionalImg[]>(fimbo.img_additional ? (fimbo.img_additional.length > 0 ? fimbo.img_additional : [{path: ""}]) : [{path: ""}])

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
            {img_add.map((ent, index) =>
                <div key={index} className="FimboItemPage__form__item__mp4">
                    <div className="FimboItemPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboItemPage__form__item_text">№{index + 1} Путь доп. <br/>картинки
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"img_additional_path_" + index} defaultValue={ent.path ? ent.path : ""}
                               className="FimboItemPage__form__item_input"></input>
                    </div>
                </div>
            )}

            <div className="FimboItemPage__form__item__plusMinus">
                <div className="FimboItemPage__form__item__plusMinus__plus" onClick={() => {
                    addEntityImg()
                }}>
                    +
                </div>
                {img_add.length > 1 &&
                    <div className="FimboItemPage__form__item__plusMinus__minus" onClick={() => {
                        deleteEntityImg()
                    }}>
                        -
                    </div>
                }
            </div>
        </>
    );
};

export default FimboItemImg;