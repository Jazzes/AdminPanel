import React, {FC} from 'react';
import {IGenreAdd} from "../../GenreAddPage";

const GenreAddInfoLeft : FC<IGenreAdd> = ({wasChanges}) => {
    return (
        <div className="GenreAddPage__form__item">
            <div className="GenreAddPage__form__item_text">
                Название
            </div>
            <input autoComplete={"off"} required name="name"
                   onChange={() => {
                       wasChanges.current = true
                   }} className="GenreAddPage__form__item_input"/>
        </div>
    );
};

export default GenreAddInfoLeft;