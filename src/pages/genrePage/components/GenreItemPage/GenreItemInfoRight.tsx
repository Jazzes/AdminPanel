import React, {FC} from 'react';
import {IGenreItemWithChange} from "../../GenreItemPage";

const GenreItemInfoRight : FC<IGenreItemWithChange> = ({genre, wasChanges}) => {
    return (
        <>
            <div className="GenreItemPage__form__item">
                <div className="GenreItemPage__form__item_text">
                    pos
                </div>
                <input autoComplete={"off"} pattern="[0-9]+" required name="position" defaultValue={genre.position}
                       onChange={() => {
                           wasChanges.current = true
                       }} className="GenreItemPage__form__item_input"/>
            </div>
        </>
    );
};

export default GenreItemInfoRight;