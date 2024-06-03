import React, {FC} from 'react';
import {ISoulItem} from "./SoulItemForm";
import SoulItemBlock from "./SoulItemBlock";


const SoulItemInfoRight : FC<ISoulItem> = ({soul, wasChanges}) => {
    return (
        <>
            <div className="SoulItemPage__form__item">
                <div className="SoulItemPage__form__item_text">
                    Доп. информация
                </div>
                <input autoComplete={"off"} type="text" name="additional_info"
                       defaultValue={soul.soul.additional_info ? soul.soul.additional_info : ''}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulItemPage__form__item_input"/>
            </div>

            <SoulItemBlock wasChanges={wasChanges} soul={soul}/>
        </>
    );
}

export default SoulItemInfoRight;