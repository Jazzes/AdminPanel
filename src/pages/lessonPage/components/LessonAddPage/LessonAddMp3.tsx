import React, {FC, useEffect, useState} from 'react';
import {ILessonAddWithVars} from "./LessonAddInfo";


const LessonAddMp3 : FC<ILessonAddWithVars> = ({wasChanges, variables}) => {

    const [mp3_tact, setMp3_tact] = useState('')
    const [mp3_square, setMp3_square] = useState('')

    useEffect(() => {
        variables.forEach((element) => {
            if (element.name === "lesson.mp3_tact") {
                setMp3_tact(element.value_of)
            } else if (element.name === "lesson.mp3_square") {
                setMp3_square(element.value_of)
            }
        })
    }, [variables]);

    return (
        <>
            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">mp3_tact</div>
                <input autoComplete={"off"} required name="mp3_tact" onChange={() => {
                    wasChanges.current = true
                }} defaultValue={mp3_tact}
                       className="LessonAddPage__form__item_input"/>
            </div>
            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">mp3_square</div>
                <input autoComplete={"off"} required name="mp3_square" onChange={() => {
                    wasChanges.current = true
                }} defaultValue={mp3_square}
                       className="LessonAddPage__form__item_input"/>
            </div>
        </>
    );
};

export default LessonAddMp3;