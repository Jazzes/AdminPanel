import React, {FC, useState} from 'react';
import {mp4LessonEntity} from "../../../../models/Models";
import {ILessonAdd} from "./LessonAddInfo";


const LessonAddMp4 : FC<ILessonAdd> = ({wasChanges}) => {

    const [mp4Lesson, setMp4Lesson] = useState<mp4LessonEntity[]>([{name: "", path: "", preview: ""}])

    const addEntityMp4 = () => {
        setMp4Lesson([...mp4Lesson, {name: "", path: "", preview: ""}])
    }

    const deleteEntityMp4 = () => {
        let p = [...mp4Lesson]
        p.pop()
        setMp4Lesson(p)
    }

    return (
        <>
                {mp4Lesson.map((_ent, index) =>
                    <div key={index} className="LessonAddPage__form__item__mp4">
                        <div className="LessonAddPage__form__item" style={{marginBottom: "3px"}}>
                            <div
                                className="LessonAddPage__form__item_text">№{index + 1} Название <br/>mp4_youtube
                            </div>
                            <input autoComplete={"off"} onChange={() => {
                                wasChanges.current = true
                            }} name={"mp4_youtube_name_" + index}
                                   className="LessonAddPage__form__item_input"/>
                        </div>
                        <div className="LessonAddPage__form__item" style={{marginBottom: "3px"}}>
                            <div
                                className="LessonAddPage__form__item_text">№{index + 1} Путь <br/>mp4_youtube
                            </div>
                            <input autoComplete={"off"} onChange={() => {
                                wasChanges.current = true
                            }} name={"mp4_youtube_path_" + index}
                                   className="LessonAddPage__form__item_input"></input>
                        </div>
                        <div className="LessonAddPage__form__item" style={{marginBottom: "10px"}}>
                            <div
                                className="LessonAddPage__form__item_text">№{index + 1} Превью <br/>mp4_youtube
                            </div>
                            <input autoComplete={"off"} onChange={() => {
                                wasChanges.current = true
                            }} name={"mp4_youtube_preview_" + index}
                                   className="LessonAddPage__form__item_input"></input>
                        </div>
                    </div>
                )}

            <div className="LessonAddPage__form__item__plusMinus">
                <div className="LessonAddPage__form__item__plusMinus__plus" onClick={() => {
                    addEntityMp4()
                }}>
                    +
                </div>
                {mp4Lesson.length > 1 &&
                    <div className="LessonAddPage__form__item__plusMinus__minus" onClick={() => {
                        deleteEntityMp4()
                    }}>
                        -
                    </div>
                }
            </div>
        </>
    );
};

export default LessonAddMp4;