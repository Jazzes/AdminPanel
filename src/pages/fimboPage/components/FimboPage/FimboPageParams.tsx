import React, {memo, useEffect, useRef} from 'react';
import "./FimboPageParams.scss"
import {Link, useSearchParams} from "react-router-dom";


const FimboPageParams = memo(() => {

    const [searchParams, setSearchParams] = useSearchParams()

    const initName = searchParams.get('name') ? String(searchParams.get('name')) : ""
    const timeoutName = useRef<ReturnType<typeof setTimeout>>()
    const nameParam = useRef(initName)

    const deleteSearchParams = (name: string) => {
        searchParams.delete(name)
        setSearchParams(searchParams)
    }

    const addSearchParams = (name: string, value: string) => {
        searchParams.set(name, value)
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

    useEffect(() => {
        return () => clearTimeout(timeoutName.current)
    }, []);

    return (
        <div className="FimboPageParams__container">
            <div className="FimboPageParams__wrapper">
                <input name="findByName" defaultValue={nameParam.current} placeholder="Поиск по названию..."
                       onChange={(e) => {
                           changeName(e.target.value)
                       }}
                       className="FimboPageParams__input"/>
            </div>

            <Link to="/fimbo/add" className="FimboPageParams__addEntity">
                Добавить
            </Link>

        </div>
    );
})

export default FimboPageParams;