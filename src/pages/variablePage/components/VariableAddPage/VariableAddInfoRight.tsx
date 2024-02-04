import React, {FC} from 'react';
import {IVariableAddPage} from "../../VariableAddPage";

const VariableAddInfoRight : FC<IVariableAddPage> = ({wasChanges}) => {
    return (
        <>
            <div className="VariableAddPage__form__item">
                <div className="VariableAddPage__form__item_text">
                    Описание
                </div>
                <textarea autoComplete={"off"} required name="description"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="VariableAddPage__form__item_textarea"/>
            </div>
        </>
    );
};

export default VariableAddInfoRight;