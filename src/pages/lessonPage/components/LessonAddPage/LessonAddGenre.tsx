import React, {FC, useState} from 'react';
import {ILessonAdd} from "./LessonAddInfoLeft";
import {GenreApi} from "../../../../store/services/GenreApiService";

const LessonAddGenre : FC<ILessonAdd> = ({wasChanges}) => {
    const {data: genres} = GenreApi.useFetchAllGenresQuery('sort=3')

    const [conAllGenres, setConAllGenres] = useState(false)
    const [connectedGenres, setConnectedGenres] = useState<number[]>([])

    const deleteFromConFim = (value: number) => {
        setConnectedGenres(connectedGenres.filter(num => num !== value));
    }


    const addToConFim = (value: number) => {
        setConnectedGenres([...connectedGenres, value])
    }

    return (
        <>
            {genres &&
                <div className="LessonAddPage__form__item">

                    <div className="LessonAddPage__form__item_text">Связные жанры</div>

                    <input style={{display: "none"}} name="connected_genres" type="text" onChange={() => {}} value={connectedGenres.join(',')}/>

                    <div className="LessonAddPage__form__item__column">
                        <div onClick={() => {
                            wasChanges.current = true
                            if (!conAllGenres) {
                                const Ids: Array<number> = []
                                genres.rows.map((genre) => (
                                    Ids.push(genre.id)
                                ))
                                setConnectedGenres(Ids)
                                setConAllGenres(true)
                            } else {
                                setConAllGenres(false)
                                setConnectedGenres([])
                            }
                        }} className="LessonAddPage__form__item__column__item">
                            <div className={conAllGenres ? "LessonAddPage__form__item_column__square_green" : "LessonAddPage__form__item_column__square"}>
                            </div>
                            <div style={{marginLeft: 5}}>
                                Выбрать все
                            </div>
                        </div>

                        {genres.rows.map(genre =>
                            <div onClick={() => {
                                wasChanges.current = true
                                if (connectedGenres.includes(genre.id)) {
                                    deleteFromConFim(genre.id)
                                    setConAllGenres(false)
                                } else {
                                    if (connectedGenres.length === genres.rows.length - 1)
                                        setConAllGenres(true)

                                    addToConFim(genre.id)
                                }
                            }} key={genre.id} className="LessonAddPage__form__item__column__item">
                                <div
                                    className={connectedGenres.includes(genre.id) ? "LessonAddPage__form__item_column__square_green" : "LessonAddPage__form__item_column__square"}>
                                </div>
                                <div style={{marginLeft: 5}}>
                                    {genre.name}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default LessonAddGenre;