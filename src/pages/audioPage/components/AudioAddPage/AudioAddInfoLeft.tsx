import React, {FC} from 'react';
import {IAudioAdd} from "../../AudioAddPage";
import AudioAddFimbo from "./AudioAddFimbo";

const AudioAddInfoLeft : FC<IAudioAdd> = ({wasChanges}) => {
    return (
        <>
            <div className="AudioAddPage__form__item">
                <div className="AudioAddPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioAddPage__form__item_input"/>
            </div>

            <div className="AudioAddPage__form__item">
                <div className="AudioAddPage__form__item_text">
                    Позиция сортировки
                </div>
                <input autoComplete={"off"} required name="position_weight" pattern="[0-9]+" defaultValue={50}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioAddPage__form__item_input"/>
            </div>
            <div className="hint__description__field">
                Чем больше значение, тем первее элемент будет идти по списку.
            </div>

            <div className="AudioAddPage__form__item">
                <div className="AudioAddPage__form__item_text">
                    Картинка
                </div>
                <input autoComplete={"off"} required name="img"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioAddPage__form__item_input"/>
            </div>

            <div className="AudioAddPage__form__item">
                <div className="AudioAddPage__form__item_text">
                    Путь
                </div>
                <input autoComplete={"off"} required name="path"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioAddPage__form__item_input"/>
            </div>

            <div className="AudioAddPage__form__item">
                <div className="AudioAddPage__form__item_text">
                    Название mp3
                </div>
                <input autoComplete={"off"} required name="mp3_path"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioAddPage__form__item_input"/>
            </div>

            <AudioAddFimbo wasChanges={wasChanges}/>


        </>
    );
};

export default AudioAddInfoLeft;