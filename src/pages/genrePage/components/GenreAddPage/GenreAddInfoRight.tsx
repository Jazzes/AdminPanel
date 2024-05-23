import React, {FC} from 'react';
import {IGenreAdd} from "../../GenreAddPage";

const GenreAddInfoRight : FC<IGenreAdd> = ({wasChanges}) => {
    return (
        <div className="GenreAddPage__form__item">
            <div className="GenreAddPage__form__item_text">
                pos
            </div>
            <input autoComplete={"off"} required name="position" pattern="[0-9]+" defaultValue={1}
                   onChange={() => {
                       wasChanges.current = true
                   }} className="GenreAddPage__form__item_input"/>
        </div>
    );
};

export default GenreAddInfoRight;