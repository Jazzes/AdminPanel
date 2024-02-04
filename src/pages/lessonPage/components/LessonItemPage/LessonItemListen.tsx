import React, {FC, memo, useState} from 'react';
import {BeatEntity} from "../../../../models/Models";
import LessonItemPlayNotes from "./LessonItemPlayNotes";
import {ILessonOneResponse} from "../../../../models/StoreModels";

interface ILessonItemListen{
    beats: React.MutableRefObject<BeatEntity[]>
    l_beat: string
    l_tact: string
    l_square: string
    bpm: string
    lesson: ILessonOneResponse
}

const LessonItemListen : FC<ILessonItemListen> = memo(({beats, lesson, l_beat, l_square, bpm, l_tact}) => {
    const [showNotes, setShowNotes] = useState(false)

    const closeWindow = () => setShowNotes(false)

    return (
        <>
            <div className="LessonItemPage__form__notes__listen__button_container">
                <div onClick={() => setShowNotes(true)}
                     className="LessonItemPage__form__notes__listen__button">Слушать
                </div>
            </div>

            {showNotes &&
                <LessonItemPlayNotes lesson={lesson} closeWindow={closeWindow} bpm={bpm} l_tact={l_tact} l_beat={l_beat} l_square={l_square} beats={beats}/>
            }
        </>
    );
})

export default LessonItemListen;