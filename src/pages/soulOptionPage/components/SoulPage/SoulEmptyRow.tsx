import React, {memo, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

const SoulEmptyRow = memo(() => {

    const [searchParams, setSearchParams] = useSearchParams()

    const addSearchParams = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }

    const currentSort = useRef<number>(0)

    const changeSort = (type: number) => {
        if (type === currentSort.current) {
            currentSort.current = type + 1
        } else {
            currentSort.current = type
        }
        addSearchParams('sort', String(currentSort.current))
    }

    return (
        <div className="SoulItemRow__row" style={{padding: "10px"}}>


            <div className="SoulItemRow__row__id cursor_pointer" onClick={() => {
                changeSort(1)
            }}>
                id
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="SoulItemRow__row__position cursor_pointer" onClick={() => {
                changeSort(3)
            }}>
                pos
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="SoulItemRow__row__text">
                Текст
            </div>

            <div className="SoulItemRow__row__addinfo">
                Доп. информация
            </div>

            <div className="SoulItemRow__row__block cursor_pointer" onClick={() => changeSort(5)}>
                Блок
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="SoulItemRow__row__fimbos">
                Связные Фимбо
            </div>

            <div className="SoulItemRow__row__edit">

            </div>

        </div>
    );
})

export default SoulEmptyRow;