import React, {FC, memo} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";
import FimboItemImg from "./FimboItemImg";
import FimboItemPurchase from "./FimboItemPurchase";
import FimboItemVideo from "./FimboItemVideo";

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
                    Вес позиции
                </div>
                <input autoComplete={"off"} required name="position_weight" defaultValue={fimbo.position_weight} pattern="[0-9]+"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="FimboItemPage__form__item">
                <div className="FimboItemPage__form__item_text">
                    Вес приоритета
                </div>
                <input autoComplete={"off"} required name="priority_weight" defaultValue={fimbo.priority_weight}
                       pattern="[0-9]+"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <div className="hint__description__field">
                Чем больше значение, тем более приоритнее данный Фимбо в Выборе и при переходе на кавер, при наличии
                других вариантов.
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
                    Картинка на стр "Слушать"
                </div>
                <input autoComplete={"off"} required name="img_listen" defaultValue={fimbo.img_listen}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="FimboItemPage__form__item_input"/>
            </div>

            <FimboItemImg fimbo={fimbo} wasChanges={wasChanges}/>

            <FimboItemVideo fimbo={fimbo} wasChanges={wasChanges}/>

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

            <FimboItemPurchase fimbo={fimbo} wasChanges={wasChanges}/>
        </>
    );
})

export default FimboItemInfoLeft;