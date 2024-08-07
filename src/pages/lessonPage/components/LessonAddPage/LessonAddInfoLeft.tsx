import React, {FC, memo} from 'react';
import {Variable} from "../../../../models/Models";
import LessonAddMp3 from "./LessonAddMp3";
import LessonAddType from "./LessonAddType";
import LessonAddMp4 from "./LessonAddMp4";
import LessonAddVisible from "./LessonAddVisible";
import LessonAddFimbo from "./LessonAddFimbo";
import LessonAddGenre from "./LessonAddGenre";
import LessonAddPageListen from "./LessonAddPageListen";

export interface ILessonAddWithVars {
    wasChanges: React.MutableRefObject<boolean>
    variables: Variable[]
}

export interface ILessonAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const LessonAddInfoLeft : FC<ILessonAddWithVars> = memo(({wasChanges, variables}) => {

    return (

        <>
            <LessonAddType wasChanges={wasChanges}/>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">
                    Позиция сортировки
                </div>
                <input autoComplete={"off"} type="text" required name="position_weight" pattern="[0-9]+"
                       defaultValue={50}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonAddPage__form__item_input"/>
            </div>
            <div className="hint__description__field">
                Чем больше значение, тем первее элемент будет идти по списку.
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

            <LessonAddMp3 variables={variables} wasChanges={wasChanges}/>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">mp3_yandex</div>
                <textarea autoComplete={"off"} name="mp3_yandex" onChange={() => {
                    wasChanges.current = true
                }} wrap="soft" className="LessonAddPage__form__item_textarea"/>
            </div>

            <LessonAddMp4 wasChanges={wasChanges}/>

            <div className="LessonAddPage__form__item">
                <div className="LessonAddPage__form__item_text">Путь</div>
                <input autoComplete={"off"} required name="path" onChange={() => {
                    wasChanges.current = true
                }}
                       className="LessonAddPage__form__item_input"></input>
            </div>

            <LessonAddVisible wasChanges={wasChanges}/>

            <LessonAddPageListen wasChanges={wasChanges}/>

            <LessonAddFimbo wasChanges={wasChanges}/>

            <LessonAddGenre wasChanges={wasChanges}/>

        </>
    );
})

export default LessonAddInfoLeft;