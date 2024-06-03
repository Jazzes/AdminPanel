import React, {FC, memo} from 'react';
import SoulItemFimbo from "./SoulItemFimbo";
import {ISoulItem} from "./SoulItemForm";

const SoulItemInfoLeft : FC<ISoulItem> = memo(({wasChanges, soul}) => {
    return (
        <>
            <div className="SoulItemPage__form__item">
                <div className="SoulItemPage__form__item_text">
                    Позиция в списке отображения
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="position" defaultValue={soul.soul.position}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulItemPage__form__item_input"/>
            </div>

            <div className="SoulItemPage__form__item">
                <div className="SoulItemPage__form__item_text">
                    Текст
                </div>
                <input autoComplete={"off"} type="text" required name="text" defaultValue={soul.soul.text}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulItemPage__form__item_input"/>
            </div>

            <SoulItemFimbo soul={soul} wasChanges={wasChanges} />

        </>
    );
})

export default SoulItemInfoLeft;