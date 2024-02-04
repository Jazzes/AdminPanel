import React, {FC, memo} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";

const FimboItemInfoLeft : FC<FimboItemWithChange> = memo(({fimbo, wasChanges}) => {

    return (
        <>
            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name" defaultValue={fimbo.name}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    pos
                </div>
                <input autoComplete={"off"} required name="position" defaultValue={fimbo.position} pattern="[0-9]+"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    Картинка
                </div>
                <input autoComplete={"off"} required name="img" defaultValue={fimbo.img}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    Сжатая картинка
                </div>
                <input autoComplete={"off"} required name="img_resized" defaultValue={fimbo.img_resized}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="FimboItemPage__form__item FimboItemPage__form__item_relative">
                <div className="FimboItemPage__form__item_text">
                    Основной цвет фона
                </div>
                <input autoComplete={"off"} required name="background_first_color"
                       defaultValue={fimbo.background_first_color}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
                <div className="FimboItemPage__form__item_color"
                     style={{background: fimbo.background_first_color}}></div>
            </div>

            <div className="FimboItemPage__form__item FimboItemPage__form__item_relative">
                <div className="FimboItemPage__form__item_text">
                    Доп. цвет фона
                </div>
                <input autoComplete={"off"} required name="background_second_color"
                       defaultValue={fimbo.background_second_color}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
                <div className="FimboItemPage__form__item_color"
                     style={{background: fimbo.background_second_color}}></div>
            </div>

            <div className="FimboItemPage__form__item FimboItemPage__form__item_relative">
                <div className="FimboItemPage__form__item_text">
                    Основной цвет текста
                </div>
                <input autoComplete={"off"} required name="note_default_color" defaultValue={fimbo.note_default_color}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
                <div className="FimboItemPage__form__item_color" style={{background: fimbo.note_default_color}}></div>
            </div>

            <div className="FimboItemPage__form__item FimboItemPage__form__item_relative">
                <div className="FimboItemPage__form__item_text">
                    L цвет текста
                </div>
                <input autoComplete={"off"} required name="note_first_color" defaultValue={fimbo.note_first_color}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
                <div className="FimboItemPage__form__item_color" style={{background: fimbo.note_first_color}}></div>
            </div>

            <div className="FimboItemPage__form__item FimboItemPage__form__item_relative">
                <div className="FimboItemPage__form__item_text">
                    R цвет текста
                </div>
                <input autoComplete={"off"} required name="note_second_color" defaultValue={fimbo.note_second_color}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>

                <div className="FimboItemPage__form__item_color" style={{background: fimbo.note_second_color}}></div>
            </div>

            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    Путь
                </div>
                <input autoComplete={"off"} required name="path" defaultValue={fimbo.path}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    URL кнопки "Купить"
                </div>
                <input autoComplete={"off"} required name="buy_url" defaultValue={fimbo.buy_url}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>
        </>
    );
})

export default FimboItemInfoLeft;