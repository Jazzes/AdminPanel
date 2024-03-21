import React, {FC, memo, useState} from 'react';
import LessonItemNoteTable from "./LessonItemNoteTable";
import {ILessonItem} from "./LessonItemForm";


const LessonItemInfoRight : FC<ILessonItem> = memo(({wasChanges, lesson}) => {

    const [l_tact, setL_tact] = useState(String(lesson.lesson.l_tact))
    const [l_square, setL_square] = useState(String(lesson.lesson.l_square))
    const [l_beat, setL_beat] = useState(String(lesson.lesson.l_beat))
    const [bpm, setBpm] = useState(String(lesson.lesson.bpm))

    return (
        <>
            <div className="LessonItemPage__form__item">

                <div className="LessonItemPage__form__item_text">
                    Длина такта
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="l_tact"
                       onChange={e => {
                           setL_tact(e.target.value)
                           wasChanges.current = true
                       }} value={l_tact} className="LessonItemPage__form__item_input"/>
            </div>
            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    Кол-во строчек
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="l_square"
                       onChange={e => {
                           if (Number(e.target.value) > 100){
                               setL_square('100')
                           } else {
                               setL_square(e.target.value)
                           }
                           wasChanges.current = true
                       }} value={l_square} className="LessonItemPage__form__item_input"/>
            </div>
            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    Кол-во столбцов
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="l_beat"
                       onChange={e => {
                           if (Number(e.target.value) > 100){
                               setL_beat('100')
                           } else {
                               setL_beat(e.target.value)
                           }
                           wasChanges.current = true
                       }} value={l_beat} className="LessonItemPage__form__item_input"/>
            </div>
            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    bpm
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+"
                       onChange={(e) => {
                           wasChanges.current = true
                           setBpm(e.target.value)
                       }} value={bpm}
                       required name="bpm" className="LessonItemPage__form__item_input"></input>
            </div>

            <LessonItemNoteTable lesson={lesson} wasChanges={wasChanges} setL_square={setL_square} l_tact={l_tact} l_beat={l_beat}
                                l_square={l_square} bpm={bpm}/>

        </>
    );
})

export default LessonItemInfoRight;