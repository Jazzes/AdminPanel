import React, {memo, useEffect, useRef, useState} from 'react';
import "./LessonPageParams.scss"
import {FimboApi} from "../../../../store/services/FimboApiService";
import {LessonTypeApi} from "../../../../store/services/LessonTypeApiService";
import {Link, useSearchParams} from "react-router-dom";
import {GenreApi} from "../../../../store/services/GenreApiService";


const LessonPageParams = memo(() => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {data: fimbos} = FimboApi.useFetchAllFimbosQuery('')
    const {data: genres} = GenreApi.useFetchAllGenresQuery('')
    const {data: lessonTypes} = LessonTypeApi.useFetchAllLessonTypesQuery('')
    const timeoutName = useRef<ReturnType<typeof setTimeout>>()
    const timeoutFimbo = useRef<ReturnType<typeof setTimeout>>()
    const timeoutLessonType = useRef<ReturnType<typeof setTimeout>>()
    const timeoutGenre = useRef<ReturnType<typeof setTimeout>>()

    const initName = searchParams.get('name') ? String(searchParams.get('name')) : ""
    const initFimbos = searchParams.get('fimbo') ? searchParams.get('fimbo')!.split(',').map(ent => Number(ent)) : []
    const initLessonTypes = searchParams.get('lessontype') ? searchParams.get('lessontype')!.split(',').map(ent => Number(ent)) : []
    const initGenres = searchParams.get('genre') ? searchParams.get('genre')!.split(',').map(ent => Number(ent)) : []


    const nameParam = useRef(initName)
    const [connectedFimbos, setConnectedFimbos] = useState<number[]>(initFimbos)
    const [connectedLessonTypes, setConnectedLessonTypes] = useState<number[]>(initLessonTypes)
    const [connectedGenres, setConnectedGenres] = useState<number[]>(initGenres)
    const connectedFimbosRef = useRef<number[]>(initFimbos)
    const connectedLessonTypesRef = useRef<number[]>(initLessonTypes)
    const connectedGenresRef = useRef<number[]>(initGenres)

    const [fimboSort, setFimboSort] = useState(false)
    const [lessonSort, setLessonSort] = useState(false)
    const [genreSort, setGenreSort] = useState(false)


    const addSearchParams = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }

    const deleteSearchParams = (name: string) => {
        searchParams.delete(name)
        setSearchParams(searchParams)
    }

    const changeName = (changedName: string) => {
        nameParam.current = changedName
        if (timeoutName.current) {
            clearTimeout(timeoutName.current)
        }
        timeoutName.current = setTimeout(() => {
            if (changedName === "") {
                deleteSearchParams('name')
            } else {
                addSearchParams('name', changedName)
            }
        }, 500)
    }

    const changeFimbos = () => {
        if (timeoutFimbo.current) {
            clearTimeout(timeoutFimbo.current)
        }
        timeoutFimbo.current = setTimeout(() => {
            if (connectedFimbosRef.current.length === 0) {
                deleteSearchParams('fimbo')
            } else {
                addSearchParams('fimbo', connectedFimbosRef.current.join(','))
            }
        }, 500)
    }

    const changeGenres = () => {
        if (timeoutGenre.current) {
            clearTimeout(timeoutGenre.current)
        }
        timeoutGenre.current = setTimeout(() => {
            if (connectedGenresRef.current.length === 0) {
                deleteSearchParams('genre')
            } else {
                addSearchParams('genre', connectedGenresRef.current.join(','))
            }
        }, 500)
    }

    const changeLessonTypes = () => {
        if (timeoutLessonType.current) {
            clearTimeout(timeoutLessonType.current)
        }
        timeoutLessonType.current = setTimeout(() => {
            if (connectedLessonTypesRef.current.length === 0) {
                deleteSearchParams('lessontype')
            } else {
                addSearchParams('lessontype', connectedLessonTypesRef.current.join(','))
            }
        }, 500)
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeoutLessonType.current)
            clearTimeout(timeoutName.current)
            clearTimeout(timeoutFimbo.current)
            clearTimeout(timeoutGenre.current)
        }
    }, []);

    return (
        <div
            className={(fimboSort || genreSort || lessonSort) ? "LessonPageParams__container LessonPageParams__container_bigHeight" : "LessonPageParams__container"}>
            <div className="LessonPageParams__wrapper">
                <input name="findByName" defaultValue={nameParam.current} placeholder="Поиск по названию..."
                       onChange={(e) => {
                           changeName(e.target.value)
                       }}
                       className="LessonPageParams__input"/>
                <div className="LessonPageParams__fimbos" onClick={() => setFimboSort(prev => !prev)}>
                    Фимбо
                    <svg
                        className={fimboSort ? "LessonPageParams__Arrow LessonPageParams__ArrowReverse" : "LessonPageParams__Arrow"}
                        width="12"
                        height="9" viewBox="0 0 12 9" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0.803848 0L11.1962 0L6 9Z" fill="black"/>
                    </svg>
                </div>

                {(fimbos) &&
                    <div style={fimboSort ? {opacity: "1"} : {opacity: "0"}}
                        className="LessonPageParams__fimbos__list">
                        <div className="LessonPageParams__fimbos__clearAll" onClick={() => {
                            connectedFimbosRef.current = []
                            setConnectedFimbos([])
                            changeFimbos()
                        }}>
                            Убрать все
                        </div>
                        {fimbos.rows.map(entity =>
                            <div onClick={() => {
                                if (connectedFimbos.includes(entity.id)) {
                                    const p = connectedFimbos.filter(ent => ent !== entity.id)
                                    connectedFimbosRef.current = p
                                    setConnectedFimbos(p)
                                } else {
                                    const p = [...connectedFimbos, entity.id]
                                    connectedFimbosRef.current = p
                                    setConnectedFimbos(p)
                                }
                                changeFimbos()
                            }}
                                 key={entity.id} className="LessonPageParams__fimbos__list__item">
                                <div
                                    className={connectedFimbos.includes(entity.id) ? "LessonPageParams__fimbos__list__green" : "LessonPageParams__fimbos__list__greenNo"}/>
                                <div className="LessonPageParams__list__name">
                                    {entity.name}
                                </div>
                            </div>
                        )}
                    </div>
                }

                <div className="LessonPageParams__lessons" onClick={() => setLessonSort(prev => !prev)}>
                    Тип
                    <svg
                        className={lessonSort ? "LessonPageParams__Arrow LessonPageParams__ArrowReverse" : "LessonPageParams__Arrow"}
                        width="12"
                        height="9" viewBox="0 0 12 9" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0.803848 0L11.1962 0L6 9Z" fill="black"/>
                    </svg>
                </div>

                {(lessonTypes) &&
                    <div style={lessonSort ? {opacity: "1"} : {opacity: "0"}}
                         className="LessonPageParams__lessons__list">
                        <div className="LessonPageParams__lessons__clearAll"
                             onClick={() => {
                                 connectedLessonTypesRef.current = []
                                 setConnectedLessonTypes([])
                                 changeLessonTypes()
                             }}>
                            Убрать все
                        </div>
                        {lessonTypes.rows.map(entity =>
                            <div onClick={() => {
                                if (connectedLessonTypes.includes(entity.id)) {
                                    const p = connectedLessonTypes.filter(ent => ent !== entity.id)
                                    connectedLessonTypesRef.current = p
                                    setConnectedLessonTypes(p)
                                } else {
                                    const p = [...connectedLessonTypes, entity.id]
                                    connectedLessonTypesRef.current = p
                                    setConnectedLessonTypes(p)
                                }
                                changeLessonTypes()
                            }}
                                 key={entity.id} className="LessonPageParams__lessons__list__item">
                                <div
                                    className={connectedLessonTypes.includes(entity.id) ? "LessonPageParams__lessons__list__green" : "LessonPageParams__lessons__list__greenNo"}/>
                                <div className="LessonPageParams__list__name">
                                    {entity.name}
                                </div>
                            </div>
                        )}
                    </div>
                }

                <div className="LessonPageParams__genres" onClick={() => setGenreSort(prev => !prev)}>
                    Жанры
                    <svg
                        className={genreSort ? "LessonPageParams__Arrow LessonPageParams__ArrowReverse" : "LessonPageParams__Arrow"}
                        width="12"
                        height="9" viewBox="0 0 12 9" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0.803848 0L11.1962 0L6 9Z" fill="black"/>
                    </svg>
                </div>

                {(genres) &&
                    <div style={genreSort ? {opacity: "1"} : {opacity: "0"}}
                         className="LessonPageParams__genres__list">
                        <div className="LessonPageParams__genres__clearAll"
                             onClick={() => {
                                 connectedGenresRef.current = []
                                 setConnectedGenres([])
                                 changeGenres()
                             }}>
                            Убрать все
                        </div>
                        {genres.rows.map(entity =>
                            <div onClick={() => {
                                if (connectedGenres.includes(entity.id)) {
                                    const p = connectedGenres.filter(ent => ent !== entity.id)
                                    connectedGenresRef.current = p
                                    setConnectedGenres(p)
                                } else {
                                    const p = [...connectedGenres, entity.id]
                                    connectedGenresRef.current = p
                                    setConnectedGenres(p)
                                }
                                changeGenres()
                            }}
                                 key={entity.id} className="LessonPageParams__genres__list__item">
                                <div
                                    className={connectedGenres.includes(entity.id) ? "LessonPageParams__genres__list__green" : "LessonPageParams__genres__list__greenNo"}/>
                                <div className="LessonPageParams__list__name">
                                    {entity.name}
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>

            <Link to="/lesson/add" className="LessonPageParams__addEntity">
                Добавить
            </Link>

        </div>
    );
})

export default LessonPageParams;