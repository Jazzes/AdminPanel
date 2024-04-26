import React, {FC, useState} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";
import {FimboVideoEntity} from "../../../../models/Models";

const FimboItemVideo : FC<FimboItemWithChange> = ({fimbo, wasChanges}) => {
    const [video_add, setVideo_add] = useState<FimboVideoEntity[]>(fimbo.video ? (fimbo.video.length > 0 ? fimbo.video : [{path: "", preview: ""}]) : [{path: "", preview: ""}])

    const addEntityImg = () => {
        setVideo_add([...video_add, {path: "", preview: ""}])
    }

    const deleteEntityImg = () => {
        let p = [...video_add]
        p.pop()
        setVideo_add(p)
    }

    return (
        <>
            {video_add.map((ent, index) =>
                <div key={index} className="FimboItemPage__form__item__mp4">
                    <div className="FimboAddPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboAddPage__form__item_text">№{index + 1} Путь видео <br/>
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"videos_path_" + index} defaultValue={ent.path ? ent.path : ""}
                               className="FimboAddPage__form__item_input"></input>
                    </div>
                    <div className="FimboAddPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboAddPage__form__item_text">№{index + 1} Превью видео <br/>
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"videos_preview_" + index} defaultValue={ent.preview ? ent.preview : ""}
                               className="FimboAddPage__form__item_input"></input>
                    </div>
                </div>
            )}

            <div className="FimboItemPage__form__item__plusMinus">
                <div className="FimboItemPage__form__item__plusMinus__plus" onClick={() => {
                    addEntityImg()
                }}>
                    +
                </div>
                {video_add.length > 1 &&
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

export default FimboItemVideo;