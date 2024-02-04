import React, {FC, memo} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";
import FimboItemListenMp3Button from "./FimboItemListenMp3Button";

const FimboItemInfoRight: FC<FimboItemWithChange> = memo(({fimbo, wasChanges}) => {

    return (
        <>
            {fimbo.notes.map(note =>
                <div className="FimboItemPage__form__item" key={note.note}>
                    <div className="FimboItemPage__form__item_text">Нота {note.note}</div>
                    <input autoComplete={"off"} required name={"fimnote_" + note.note}
                           onChange={() => {
                               wasChanges.current = true
                           }} defaultValue={note.file_sound}
                           className="FimboItemPage__form__item_input"/>
                </div>
            )}

            <FimboItemListenMp3Button fimbo={fimbo} />

            {fimbo.lepest.map(lepest =>
                <div className="FimboItemPage__form__lepest__item" key={lepest.lep}>
                    <div className="FimboItemPage__form__item_text">Лепесток {lepest.lep}</div>
                    <div className="FimboItemPage__form__lepest__item__row">
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>rotate</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_transform"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.transform}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>width</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_width"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.width}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>height</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_height"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.height}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>left</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_left"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.left}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>top</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_top"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.top}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>num top</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_num_top"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.num_top}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>num left</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_num_left"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.num_left}
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
})

export default FimboItemInfoRight;