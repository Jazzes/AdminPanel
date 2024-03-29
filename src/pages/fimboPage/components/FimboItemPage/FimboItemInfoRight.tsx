import React, {FC, memo} from 'react';
import {FimboItemWithChange} from "../../FimboItemPage";
import FimboItemListenMp3Button from "./FimboItemListenMp3Button";

const FimboItemInfoRight: FC<FimboItemWithChange> = memo(({fimbo, wasChanges}) => {



    return (
        <>
            {fimbo.notes.size22.map(note =>
                <div className="FimboItemPage__form__item" key={note.note}>
                    <div className="FimboItemPage__form__item_text">22см нота {note.note}</div>
                    <input autoComplete={"off"} required name={"fimnote22cm_" + note.note}
                           onChange={() => {
                               wasChanges.current = true
                           }} defaultValue={note.file_sound}
                           className="FimboItemPage__form__item_input"/>
                </div>
            )}
            {fimbo.notes.size27.map(note =>
                <div className="FimboItemPage__form__item" key={note.note}>
                    <div className="FimboItemPage__form__item_text">27см нота {note.note}</div>
                    <input autoComplete={"off"} required name={"fimnote27cm_" + note.note}
                           onChange={() => {
                               wasChanges.current = true
                           }} defaultValue={note.file_sound}
                           className="FimboItemPage__form__item_input"/>
                </div>
            )}
            {fimbo.notes.size32.map(note =>
                <div className="FimboItemPage__form__item" key={note.note}>
                    <div className="FimboItemPage__form__item_text">32см нота {note.note}</div>
                    <input autoComplete={"off"} required name={"fimnote32cm_" + note.note}
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
                                   }} defaultValue={lepest.transform} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>width</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_width"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.width} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>height</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_height"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.height} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>left</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_left"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.left} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>top</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_top"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.top} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>num top</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_num_top"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.num_top} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                        <div className="FimboItemPage__form__lepest__item__row__item">
                            <div>num left</div>
                            <input autoComplete={"off"} required name={"lep" + lepest.lep + "_num_left"}
                                   onChange={() => {
                                       wasChanges.current = true
                                   }} defaultValue={lepest.num_left} pattern="[0-9]+.?[0-9]*"
                                   className="FimboItemPage__form__lepest__input"/>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
})

export default FimboItemInfoRight;