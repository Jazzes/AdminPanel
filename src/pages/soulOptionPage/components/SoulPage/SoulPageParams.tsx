import React, {memo, useEffect, useRef, useState} from 'react';
import "./SoulPageParams.scss"
import {FimboApi} from "../../../../store/services/FimboApiService";
import {Link, useSearchParams} from "react-router-dom";


const SoulPageParams = memo(() => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {data: fimbos} = FimboApi.useFetchAllFimbosQuery('')
    const timeoutName = useRef<ReturnType<typeof setTimeout>>()
    const timeoutFimbo = useRef<ReturnType<typeof setTimeout>>()

    const initName = searchParams.get('name') ? String(searchParams.get('name')) : ""
    const initFimbos = searchParams.get('fimbo') ? searchParams.get('fimbo')!.split(',').map(ent => Number(ent)) : []

    const nameParam = useRef(initName)
    const [connectedFimbos, setConnectedFimbos] = useState<number[]>(initFimbos)
    const connectedFimbosRef = useRef<number[]>(initFimbos)

    const [fimboSort, setFimboSort] = useState(false)

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

    useEffect(() => {
        return () => {
            clearTimeout(timeoutName.current)
            clearTimeout(timeoutFimbo.current)
        }
    }, []);

    return (
        <div
            className={(fimboSort) ? "SoulPageParams__container SoulPageParams__container_bigHeight" : "SoulPageParams__container"}>
            <div className="SoulPageParams__wrapper">
                <input name="findByName" defaultValue={nameParam.current} placeholder="Поиск по названию..."
                       onChange={(e) => {
                           changeName(e.target.value)
                       }}
                       className="SoulPageParams__input"/>
                <div className="SoulPageParams__fimbos" onClick={() => setFimboSort(prev => !prev)}>
                    Фимбо
                    <svg
                        className={fimboSort ? "SoulPageParams__Arrow SoulPageParams__ArrowReverse" : "SoulPageParams__Arrow"}
                        width="12"
                        height="9" viewBox="0 0 12 9" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0.803848 0L11.1962 0L6 9Z" fill="black"/>
                    </svg>
                </div>

                {(fimbos) &&
                    <div style={fimboSort ? {opacity: "1"} : {opacity: "0", pointerEvents: "none"}}
                        className="SoulPageParams__fimbos__list">
                        <div className="SoulPageParams__fimbos__clearAll" onClick={() => {
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
                                 key={entity.id} className="SoulPageParams__fimbos__list__item">
                                <div
                                    className={connectedFimbos.includes(entity.id) ? "SoulPageParams__fimbos__list__green" : "SoulPageParams__fimbos__list__greenNo"}/>
                                <div className="SoulPageParams__list__name">
                                    {entity.name}
                                </div>
                            </div>
                        )}
                    </div>
                }

            </div>

            <Link to="/soul/add" className="SoulPageParams__addEntity">
                Добавить
            </Link>

        </div>
    );
})

export default SoulPageParams;