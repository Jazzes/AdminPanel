import React, {FC, memo} from 'react';
import LessonItemType from "./LessonItemType";
import LessonItemMp3 from "./LessonItemMp3";
import LessonItemMp4 from "./LessonItemMp4";
import LessonItemVisible from "./LessonItemVisible";
import LessonItemFimbo from "./LessonItemFimbo";
import {ILessonItem} from "./LessonItemForm";
import LessonItemGenre from "./LessonItemGenre";
import LessonItemPageListen from "./LessonItemPageListen";

const LessonItemInfoLeft : FC<ILessonItem> = memo(({wasChanges, lesson}) => {
    return (
        <>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    Позиция сортировки
                </div>
                <input autoComplete={"off"} type="text" required name="position_weight"
                       defaultValue={lesson.lesson.position_weight}
                       pattern="[0-9]+"
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonItemPage__form__item_input"/>
            </div>
            <div className="hint__description__field">
                Чем больше значение, тем первее элемент будет идти по списку.
            </div>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} type="text" required name="name" defaultValue={lesson.lesson.name}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonItemPage__form__item_input"/>
            </div>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    Подзаголовок
                </div>
                <input autoComplete={"off"} type="text" name="subtitle"
                       defaultValue={lesson.lesson.subtitle ? lesson.lesson.subtitle : ''}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonItemPage__form__item_input"/>
            </div>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    Картинка
                </div>
                <input autoComplete={"off"} type="text" required name="img" defaultValue={lesson.lesson.img}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonItemPage__form__item_input"/>
            </div>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">
                    mp3_fimbo
                </div>
                <input autoComplete={"off"} type="text" required name="mp3_fimbo"
                       defaultValue={lesson.lesson.mp3.mp3_fimbo}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="LessonItemPage__form__item_input"/>
            </div>

            <LessonItemMp3 lesson={lesson} wasChanges={wasChanges}/>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">mp3_yandex</div>
                <textarea autoComplete={"off"} name="mp3_yandex"
                          defaultValue={lesson.lesson.mp3.mp3_yandex ? lesson.lesson.mp3.mp3_yandex : ""}
                          onChange={() => {
                              wasChanges.current = true
                          }} wrap="soft" className="LessonItemPage__form__item_textarea"/>
            </div>

            <LessonItemMp4 lesson={lesson} wasChanges={wasChanges}/>

            <div className="LessonItemPage__form__item">
                <div className="LessonItemPage__form__item_text">Путь</div>
                <input autoComplete={"off"} required name="path" onChange={() => {
                    wasChanges.current = true
                }} defaultValue={lesson.lesson.path}
                       className="LessonItemPage__form__item_input"></input>
            </div>

            <LessonItemType wasChanges={wasChanges} lesson={lesson}/>

            <LessonItemVisible lesson={lesson} wasChanges={wasChanges}/>

            <LessonItemPageListen wasChanges={wasChanges} lesson={lesson}/>

            <LessonItemFimbo lesson={lesson} wasChanges={wasChanges}/>

            <LessonItemGenre wasChanges={wasChanges} lesson={lesson}/>

        </>
    );
})

export default LessonItemInfoLeft;