import React, {FC} from 'react';
import {IVariableItemPageWithChanges} from "../../VariableItemPage";

const VariableItemInfoLeft : FC<IVariableItemPageWithChanges> = ({variable, wasChanges}) => {
    return (
        <>
            <div className="VariableItemPage__form__item">
                <div className="VariableItemPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} defaultValue={variable.name} className="VariableItemPage__form__item_input"/>
            </div>

            <div className="VariableItemPage__form__item">
                <div className="VariableItemPage__form__item_text">
                    Значение
                </div>
                <input autoComplete={"off"} required name="value_of"
                       onChange={() => {
                           wasChanges.current = true
                       }} defaultValue={variable.value_of} className="VariableItemPage__form__item_input"/>
            </div>
        </>
    );
};

export default VariableItemInfoLeft;