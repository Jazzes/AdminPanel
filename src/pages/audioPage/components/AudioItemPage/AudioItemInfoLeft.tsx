import React, {FC} from 'react';
import {AudioItemWithChange} from "../../AudioItemPage";
import AudioItemFimbo from "./AudioItemFimbo";
import AudioItemListenMp3 from "./AudioItemListenMp3";

const AudioItemInfoLeft : FC<AudioItemWithChange>= ({audio, wasChanges}) => {
    return (
        <>
            <div className="AudioItemPage__form__item">
                <div className="AudioItemPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name" defaultValue={audio.name}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioItemPage__form__item_input"/>
            </div>

            <div className="AudioItemPage__form__item">
                <div className="AudioItemPage__form__item_text">
                    pos
                </div>
                <input autoComplete={"off"} required name="position" pattern="[0-9]+" defaultValue={audio.position}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioItemPage__form__item_input"/>
            </div>

            <div className="AudioItemPage__form__item">
                <div className="AudioItemPage__form__item_text">
                    Картинка
                </div>
                <input autoComplete={"off"} required name="img" defaultValue={audio.img}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioItemPage__form__item_input"/>
            </div>

            <div className="AudioItemPage__form__item">
                <div className="AudioItemPage__form__item_text">
                    Путь
                </div>
                <input autoComplete={"off"} required name="path" defaultValue={audio.path}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioItemPage__form__item_input"/>
            </div>
            <div className="AudioItemPage__form__item">
                <div className="AudioItemPage__form__item_text">
                    Название mp3
                </div>
                <input autoComplete={"off"} required name="mp3_path" defaultValue={audio.mp3_path}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="AudioItemPage__form__item_input"/>
            </div>

            <AudioItemListenMp3 audio={audio} />

            <AudioItemFimbo audio={audio} wasChanges={wasChanges}/>


        </>
    );
};

export default AudioItemInfoLeft;