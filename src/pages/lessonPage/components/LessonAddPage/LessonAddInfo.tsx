import React, {FC, memo} from 'react';
import {Variable} from "../../../../models/Models";
import LessonAddMp3 from "./LessonAddMp3";
import LessonAddType from "./LessonAddType";
import LessonAddMp4 from "./LessonAddMp4";
import LessonAddVisible from "./LessonAddVisible";
import LessonAddFimbo from "./LessonAddFimbo";
import LessonAddGenre from "./LessonAddGenre";

export interface ILessonAddWithVars {
    wasChanges: React.MutableRefObject<boolean>
    variables: Variable[]
}

export interface ILessonAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const LessonAddInfo : FC<ILessonAddWithVars> = memo(({wasChanges, variables}) => {

    return (

        <>
            <LessonAddType wasChanges={wasChanges} />

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    Позиция в списке отображения
                </div>
                <input autoComplete={"off"} type="text" pattern="[0-9]+" required name="position" defaultValue={1}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonAddPage__form__item_input"/>
            </div>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} type="text" required name="name"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonAddPage__form__item_input"/>
            </div>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    Подзаголовок
                </div>
                <input autoComplete={"off"} type="text" name="subtitle"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonAddPage__form__item_input"/>
            </div>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    Картинка
                </div>
                <input autoComplete={"off"} type="text" required name="img"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonAddPage__form__item_input"/>
            </div>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    mp3_fimbo
                </div>
                <input autoComplete={"off"} type="text" required name="mp3_fimbo"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonAddPage__form__item_input"/>
            </div>

            <LessonAddMp3 variables={variables} wasChanges={wasChanges} />

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">mp3_yandex</div>
                <textarea autoComplete={"off"} name="mp3_yandex" onChange={() => {
                    wasChanges.current = true
                }} wrap="soft" className="LessonAddPage__form__item_textarea"/>
            </div>

            <LessonAddMp4 wasChanges={wasChanges} />

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">Путь</div>
                <input autoComplete={"off"} required name="path" onChange={() => {
                    wasChanges.current = true
                }}
                       className="LessonAddPage__form__item_input"></input>
            </div>

            <LessonAddVisible wasChanges={wasChanges} />

            <LessonAddFimbo wasChanges={wasChanges} />

            <LessonAddGenre wasChanges={wasChanges} />

        </>
    );
})

export default LessonAddInfo;