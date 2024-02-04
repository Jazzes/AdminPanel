import React, {FC, useState} from 'react';
import {mp4LessonEntity} from "../../../../models/Models";
import {ILessonItem} from "./LessonItemForm";


const LessonItemMp4 : FC<ILessonItem> = ({lesson, wasChanges}) => {

    const [mp4Lesson, setMp4Lesson] = useState<mp4LessonEntity[]>(lesson.lesson.mp3.mp4_youtube ? lesson.lesson.mp3.mp4_youtube : [{name: "", path: "", preview: ""}])

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
            {mp4Lesson.map((ent, index) =>
                <div key={index} className="LessonItemPage__form__item__mp4">
                    <div className="LessonItemPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="LessonItemPage__form__item_text">№{index + 1} Название <br/>mp4_youtube
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"mp4_youtube_name_" + index} defaultValue={ent.name ? ent.name : ""}
                               className="LessonItemPage__form__item_input"/>
                    </div>
                    <div className="LessonItemPage__form__item" style={{marginBottom: "3px"}}>
                        <div
                            className="LessonItemPage__form__item_text">№{index + 1} Путь <br/>mp4_youtube
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"mp4_youtube_path_" + index} defaultValue={ent.path ? ent.path : ""}
                               className="LessonItemPage__form__item_input"></input>
                    </div>
                    <div className="LessonItemPage__form__item" style={{marginBottom: "10px"}}>
                        <div
                            className="LessonItemPage__form__item_text">№{index + 1} Превью <br/>mp4_youtube
                        </div>
                        <input autoComplete={"off"} onChange={() => {
                            wasChanges.current = true
                        }} name={"mp4_youtube_preview_" + index} defaultValue={ent.preview ? ent.preview : ""}
                               className="LessonItemPage__form__item_input"></input>
                    </div>
                </div>
            )}

            <div className="LessonItemPage__form__item__plusMinus">
                <div className="LessonItemPage__form__item__plusMinus__plus" onClick={() => {
                    addEntityMp4()
                }}>
                    +
                </div>
                {mp4Lesson.length > 1 &&
                    <div className="LessonItemPage__form__item__plusMinus__minus" onClick={() => {
                        deleteEntityMp4()
                    }}>
                        -
                    </div>
                }
            </div>
        </>
    );
};

export default LessonItemMp4;