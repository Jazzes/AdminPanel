import React, {FC, memo} from 'react';
import {IFimboAdd} from "../../FimboAddPage";
import FimboAddImg from "./FimboAddImg";
import FimboAddPurchase from "./FimboAddPurchase";
import FimboAddVideo from "./FimboAddVideo";

const FimboAddInfoLeft : FC<IFimboAdd> = memo(({wasChanges}) => {
    return (
        <>
            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    pos
                </div>
                <input autoComplete={"off"} required name="position" pattern="[0-9]+" defaultValue={1}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Приоритет
                </div>
                <input autoComplete={"off"} required name="priority" pattern="[0-9]+" defaultValue={1}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Картинка
                </div>
                <input autoComplete={"off"} required name="img"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Картинка на стр "Слушать"
                </div>
                <input autoComplete={"off"} required name="img_listen"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <FimboAddImg wasChanges={wasChanges}/>

            <FimboAddVideo wasChanges={wasChanges}/>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Основной цвет фона
                </div>
                <input autoComplete={"off"} required name="background_first_color"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Доп. цвет фона
                </div>
                <input autoComplete={"off"} required name="background_second_color"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Основной цвет текста
                </div>
                <input autoComplete={"off"} required name="note_default_color"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    L цвет текста
                </div>
                <input autoComplete={"off"} required name="note_first_color"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    R цвет текста
                </div>
                <input autoComplete={"off"} required name="note_second_color"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    Путь
                </div>
                <input autoComplete={"off"} required name="path"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>

            <div className="FimboAddPage__form__item">
                <div className="FimboAddPage__form__item_text">
                    URL кнопки "Купить"
                </div>
                <input autoComplete={"off"} required name="buy_url"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboAddPage__form__item_input"/>
            </div>
            <FimboAddPurchase wasChanges={wasChanges}/>
        </>
    );
})

export default FimboAddInfoLeft;