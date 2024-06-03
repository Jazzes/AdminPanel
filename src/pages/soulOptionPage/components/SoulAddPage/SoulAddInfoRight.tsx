import React, {FC, memo} from 'react';
import {ISoulAdd} from "./SoulAddInfoLeft";
import SoulAddBlock from "./SoulAddBlock";


const SoulAddInfoRight: FC<ISoulAdd> = ({wasChanges}) => {


    return (
        <>
            <div className="SoulAddPage__form__item">
                <div className="SoulAddPage__form__item_text">
                    Доп. информация
                </div>
                <input autoComplete={"off"} type="text" name="additional_info"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulAddPage__form__item_input"/>
            </div>

            <SoulAddBlock wasChanges={wasChanges}/>
        </>
    );
}

export default SoulAddInfoRight;