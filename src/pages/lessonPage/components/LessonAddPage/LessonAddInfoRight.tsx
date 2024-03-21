import React, {FC, memo, useEffect, useState} from 'react';
import LessonAddNoteTable from "./LessonAddNoteTable";
import {ILessonAddWithVars} from "./LessonAddInfoLeft";


const LessonAddInfoRight: FC<ILessonAddWithVars> = memo(({wasChanges, variables}) => {

    const [l_tact, setL_tact] = useState('')
    const [l_square, setL_square] = useState('')
    const [l_beat, setL_beat] = useState('')
    const [bpm, setBpm] = useState('')

    useEffect(() => {
        variables.forEach((element) => {
            if (element.name === "lesson.l_tact") {
                setL_tact(element.value_of)
            } else if (element.name === "lesson.l_square") {
                setL_square(element.value_of)
            } else if (element.name === "lesson.l_beat") {
                setL_beat(element.value_of)
            }
            else if (element.name === "lesson.bpm") {
                setBpm(element.value_of)
            }
        })
    }, [variables]);

    return (
        <>
            <div className="LessonAddPage__form__item">

                <div className="LessonAddPage__form__item_text">
                    Длина такта
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="l_tact"
                       onChange={e => {
                           setL_tact(e.target.value)
                           wasChanges.current = true
                       }} value={l_tact} className="LessonAddPage__form__item_input"/>
            </div>
            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
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
                       }} value={l_square} className="LessonAddPage__form__item_input"/>
            </div>
            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
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
                       }} value={l_beat} className="LessonAddPage__form__item_input"/>
            </div>
            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    bpm
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+"
                       onChange={() => {
                           wasChanges.current = true
                       }} defaultValue={bpm}
                       required name="bpm" className="LessonAddPage__form__item_input"></input>
            </div>

            <LessonAddNoteTable wasChanges={wasChanges} setL_square={setL_square} l_tact={l_tact} l_beat={l_beat}
                                l_square={l_square}/>

        </>
    );
})

export default LessonAddInfoRight;