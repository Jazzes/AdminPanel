import React, {FC} from 'react';
import {IGenreItemWithChange} from "../../GenreItemPage";

const GenreItemInfoLeft : FC<IGenreItemWithChange> = ({wasChanges, genre}) => {
    return (
        <>
            <div className="GenreItemPage__form__item">
                <div className="GenreItemPage__form__item_text">
                    Название
                </div>
                <input autoComplete={"off"} required name="name" defaultValue={genre.name}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="GenreItemPage__form__item_input"/>
            </div>
        </>
    );
};

export default GenreItemInfoLeft;