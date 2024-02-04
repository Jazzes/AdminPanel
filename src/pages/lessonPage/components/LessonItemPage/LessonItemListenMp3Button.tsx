import React, {FC, useState} from 'react';
import {ILessonOneResponse} from "../../../../models/StoreModels";
import LessonItemListenMp3 from "./LessonItemListenMp3";

interface ILessonItemListenMp3Button{
    lesson: ILessonOneResponse
}

const LessonItemListenMp3Button : FC<ILessonItemListenMp3Button> = ({lesson}) => {

    const [showMp3, setShowMp3] = useState(false)

    const closeWindow = () => setShowMp3(false)

    return (
        <>
            <div className="LessonItemPage__form__notes__listen__button" onClick={() => setShowMp3(true)}>
                Слушать mp3
            </div>
            {showMp3 &&
                <LessonItemListenMp3 closeWindow={closeWindow} lesson={lesson} />
            }
        </>
    );
};

export default LessonItemListenMp3Button;