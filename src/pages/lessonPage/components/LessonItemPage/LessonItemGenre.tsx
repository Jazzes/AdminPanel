import React, {FC, useEffect, useState} from 'react';
import {ILessonItem} from "./LessonItemForm";
import {GenreApi} from "../../../../store/services/GenreApiService";

const LessonItemGenre : FC<ILessonItem> = ({lesson, wasChanges}) => {
    const {data: genres} = GenreApi.useFetchAllGenresQuery('sort=3')

    const [conAllGenres, setConAllGenres] = useState(false)
    const [connectedGenres, setConnectedGenres] = useState<Array<number>>([])

    const deleteFromConFim = (value: number) => {
        setConnectedGenres(connectedGenres.filter(num => num !== value));
    }

    const addToConFim = (value: number) => {
        setConnectedGenres([...connectedGenres, value])
    }

    useEffect(() => {
        const ids: number[] = []
        lesson.genres.map((genre) => (
            ids.push(genre.id)
        ))
        setConnectedGenres(ids)
    }, [lesson.genres]);

    return (
        <>
            {genres &&
                <div className="LessonItemPage__form__item">

                    <div className="LessonItemPage__form__item_text">Связные жанры</div>

                    <input style={{display: "none"}} name="connected_genres" type="text" onChange={() => {}} value={connectedGenres.join(',')}/>

                    <div className="LessonItemPage__form__item__column">
                        <div onClick={() => {
                            wasChanges.current = true
                            if (!conAllGenres) {
                                const Ids: Array<number> = []
                                genres.rows.map((fimbo) => (
                                    Ids.push(fimbo.id)
                                ))
                                setConnectedGenres(Ids)
                                setConAllGenres(true)
                            } else {
                                setConAllGenres(false)
                                setConnectedGenres([])
                            }
                        }} className="LessonItemPage__form__item__column__item">
                            <div className={conAllGenres ? "LessonItemPage__form__item_column__square_green" : "LessonItemPage__form__item_column__square"}>
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
                            }} key={genre.id} className="LessonItemPage__form__item__column__item">
                                <div
                                    className={connectedGenres.includes(genre.id) ? "LessonItemPage__form__item_column__square_green" : "LessonItemPage__form__item_column__square"}>
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

export default LessonItemGenre;