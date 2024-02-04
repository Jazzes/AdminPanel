import React, {FC, memo} from 'react';
import {IFimboAdd} from "../../FimboAddPage";

const FimboAddInfoRight : FC<IFimboAdd> = memo(({wasChanges}) => {

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    return (
        <>
            {numbers.map(note =>
                <div className="FimboAddPage__form__item" key={note}>
                    <div className="FimboAddPage__form__item_text">Нота {note}</div>
                    <input autoComplete={"off"} required name={"fimnote_" + note}
                           onChange={ () => {
                               wasChanges.current = true
                           }}
                           className="FimboAddPage__form__item_input"/>
                </div>
            )}



            {numbers.map(note =>
                <div className="FimboAddPage__form__lepest__item" key={note}>
                    <div className="FimboAddPage__form__item_text">Лепесток {note}</div>
                    <div className="FimboAddPage__form__lepest__item__row">
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>rotate</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_transform"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>width</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_width"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>height</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_height"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>left</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_left"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>top</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_top"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>num top</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_num_top"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                        <div className="FimboAddPage__form__lepest__item__row__item">
                            <div>num left</div>
                            <input autoComplete={"off"} required name={"lep" + note + "_num_left"}
                                   onChange={ () => {
                                       wasChanges.current = true
                                   }}
                                   className="FimboAddPage__form__lepest__input"/>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
})

export default FimboAddInfoRight;