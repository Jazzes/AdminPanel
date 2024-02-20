import React, {FC, useState} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";

const FimboItemPurchase : FC<FimboItemWithChange> = ({fimbo, wasChanges}) => {
    const [purchase, setPurchase] = useState(fimbo.purchase)

    return (
        <div className="FimboItemPage__form__item">
            <div className="FimboItemPage__form__item_text">Продается</div>
            <input style={{display: "none"}} name="purchase" type="number" value={Number(purchase)}
                   onChange={() => {
                   }}/>
            <div className="FimboItemPage__form__item__column">
                <div className="FimboItemPage__form__item__column__item" onClick={() => {
                    setPurchase(true)
                    wasChanges.current = true
                }}>
                    <div className={purchase ? "FimboItemPage__form__item_column__circle_green" : "FimboItemPage__form__item_column__circle"}></div>
                    <div style={{marginLeft: 5}}>Да</div>
                </div>

                <div className="FimboItemPage__form__item__column__item" onClick={() => {
                    setPurchase(false)
                    wasChanges.current = true
                }}>
                    <div className={purchase ? "FimboItemPage__form__item_column__circle" : "FimboItemPage__form__item_column__circle_green"}></div>
                    <div style={{marginLeft: 5}}>Нет</div>
                </div>

            </div>
        </div>
    );
};

export default FimboItemPurchase;