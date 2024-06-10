import React, {memo, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

const FimboEmptyRow = memo(() => {

    const [searchParams, setSearchParams] = useSearchParams()

    const changeSort = (type: number) => {
        if (type === currentSort.current) {
            currentSort.current = type + 1
        } else {
            currentSort.current = type
        }
        addSearchParams('sort', String(currentSort.current))
    }

    const addSearchParams = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }

    const currentSort = useRef<number>(0)


    return (
        <div className="FimboItemRow__row" style={{padding: "10px"}}>

            <div className="FimboItemRow__row__id cursor_pointer" onClick={() => {
                changeSort(1)
            }}>
                id
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="FimboItemRow__row__pos">
                pos
            </div>

            <div className="FimboItemRow__row__priority cursor_pointer" onClick={() => changeSort(3)}>
                Приоритет
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="FimboItemRow__row__name cursor_pointer" onClick={() => {
                changeSort(5)
            }}>
                Название
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="FimboItemRow__row__purchase">
                В продаже
            </div>

            <div className="FimboItemRow__row__preview">
                Превью
            </div>

            <div className="FimboItemRow__row__path cursor_pointer" onClick={() => {
                changeSort(7)
            }}>
                Путь
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="FimboItemRow__row__edit">

            </div>

        </div>
    );
})

export default FimboEmptyRow;