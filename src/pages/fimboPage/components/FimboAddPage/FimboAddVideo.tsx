import React, {FC, useState} from 'react';
import {FimboVideoEntity} from "../../../../models/Models";
import {IFimboAdd} from "../../FimboAddPage";

const FimboAddVideo : FC<IFimboAdd> = ({wasChanges}) => {
    const [video_add, setVideo_add] = useState<FimboVideoEntity[]>([{path: "", preview: ""}])

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
            {video_add.map((_ent, index) =>
                <div key={index} className="FimboAddPage__form__item__mp4">
                    <div className="FimboAddPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboAddPage__form__item_text">№{index + 1} Путь видео <br/>
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"videos_path_" + index}
                               className="FimboAddPage__form__item_input"></input>
                    </div>
                    <div className="FimboAddPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="FimboAddPage__form__item_text">№{index + 1} Превью видео <br/>
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"videos_preview_" + index}
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
                {video_add.length > 1 &&
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

export default FimboAddVideo;