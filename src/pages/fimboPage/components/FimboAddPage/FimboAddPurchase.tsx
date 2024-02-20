import React, {FC, useState} from 'react';
import {IFimboAdd} from "../../FimboAddPage";

const FimboAddPurchase : FC<IFimboAdd> = ({wasChanges}) => {
    const [purchase, setPurchase] = useState(true)

    return (
        <div className="FimboAddPage__form__item">
            <div className="FimboAddPage__form__item_text">Продается</div>
            <input style={{display: "none"}} name="purchase" type="number" value={Number(purchase)}
                   onChange={() => {
                   }}/>
            <div className="FimboAddPage__form__item__column">
                <div className="FimboAddPage__form__item__column__item" onClick={() => {
                    setPurchase(true)
                    wasChanges.current = true
                }}>
                    <div className={purchase ? "FimboAddPage__form__item_column__circle_green" : "FimboAddPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Да</div>
                </div>

                <div className="FimboAddPage__form__item__column__item" onClick={() => {
                    setPurchase(false)
                    wasChanges.current = true
                }}>
                    <div className={purchase ? "FimboAddPage__form__item_column__circle" : "FimboAddPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Нет</div>
                </div>

            </div>
        </div>
    );
};

export default FimboAddPurchase;