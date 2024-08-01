import React, {FC, memo} from 'react';
import SoulItemFimbo from "./SoulItemFimbo";
import {ISoulItem} from "./SoulItemForm";

const SoulItemInfoLeft : FC<ISoulItem> = memo(({wasChanges, soul}) => {
    return (
        <>
            <div className="SoulItemPage__form__item">
                <div className="SoulItemPage__form__item_text">
                    Позиция сортировки
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="position_weight"
                       defaultValue={soul.soul.position_weight}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulItemPage__form__item_input"/>
            </div>
            <div className="hint__description__field">
                Чем больше значение, тем первее элемент будет идти по списку.
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

            <SoulItemFimbo soul={soul} wasChanges={wasChanges}/>

        </>
    );
})

export default SoulItemInfoLeft;