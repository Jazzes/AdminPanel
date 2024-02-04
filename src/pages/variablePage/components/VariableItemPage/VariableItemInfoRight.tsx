import React, {FC} from 'react';
import {IVariableItemPageWithChanges} from "../../VariableItemPage";

const VariableItemInfoRight : FC<IVariableItemPageWithChanges> = ({variable, wasChanges}) => {
    return (
        <div className="VariableItemPage__form__item">
            <div className="VariableItemPage__form__item_text">
                Описание
            </div>
            <textarea autoComplete={"off"} required name="description"
                      onChange={() => {
                          wasChanges.current = true
                      }} defaultValue={variable.description} className="VariableItemPage__form__item_textarea"/>
        </div>
    );
};

export default VariableItemInfoRight;