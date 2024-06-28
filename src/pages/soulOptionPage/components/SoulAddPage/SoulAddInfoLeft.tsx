import React, {FC} from 'react';
import SoulAddFimbo from "./SoulAddFimbo";

export interface ISoulAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const SoulAddInfoLeft : FC<ISoulAdd> = ({wasChanges}) => {

    return (

        <>
            <div className="SoulAddPage__form__item">
                <div className="SoulAddPage__form__item_text">
                    Вес позиции
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="position_weight" defaultValue={50}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulAddPage__form__item_input"/>
            </div>

            <div className="SoulAddPage__form__item">
                <div className="SoulAddPage__form__item_text">
                    Текст
                </div>
                <input autoComplete={"off"} type="text" required name="text"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="SoulAddPage__form__item_input"/>
            </div>


            <SoulAddFimbo wasChanges={wasChanges} />

        </>
    );
}

export default SoulAddInfoLeft;