import React, {FC} from 'react';
import {IVariableAddPage} from "../../VariableAddPage";

const VariableAddInfoLeft : FC<IVariableAddPage> = ({wasChanges}) => {
    return (
        <>
            <div className="VariableAddPage__form__item">
                <div className="VariableAddPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="VariableAddPage__form__item_input"/>
            </div>

            <div className="VariableAddPage__form__item">
                <div className="VariableAddPage__form__item_text">
                    Значение
                </div>
                <input autoComplete={"off"} required name="value_of"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="VariableAddPage__form__item_input"/>
            </div>
        </>
    );
};

export default VariableAddInfoLeft;