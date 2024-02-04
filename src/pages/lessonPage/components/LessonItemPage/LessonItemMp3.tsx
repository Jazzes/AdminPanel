import React, {FC} from 'react';
import {ILessonItem} from "./LessonItemForm";
import LessonItemListenMp3Button from "./LessonItemListenMp3Button";

const LessonItemMp3 : FC<ILessonItem> = ({lesson, wasChanges}) => {
    return (
        <>
            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">mp3_tact</div>
                <input autoComplete={"off"} required name="mp3_tact" onChange={() => {
                    wasChanges.current = true
                }} defaultValue={lesson.lesson.mp3.mp3_tact}
                       className="LessonItemPage__form__item_input"/>
            </div>
            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">mp3_square</div>
                <input autoComplete={"off"} required name="mp3_square" onChange={() => {
                    wasChanges.current = true
                }} defaultValue={lesson.lesson.mp3.mp3_square}
                       className="LessonItemPage__form__item_input"/>
            </div>
            <LessonItemListenMp3Button lesson={lesson} />
        </>
    );
};

export default LessonItemMp3;