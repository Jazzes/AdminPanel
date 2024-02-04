import React, {memo, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

const LessonEmptyRow = memo(() => {

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
        <div className="LessonItemRow__row" style={{padding: "10px"}}>

            <div className="LessonItemRow__row__visible cursor_pointer" onClick={() => {
                changeSort(1)
            }}>
                <svg width="20" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.2075 0.000139824C20.3888 0.0916789 25.46 5.89343 28 10.8854C28 10.8854 27.1062 12.7949 26.2679 14.0172C25.8622 14.6086 25.4355 15.1846 24.9871 15.7418C24.6673 16.1385 24.3371 16.5248 23.9945 16.9001C20.9331 20.2565 16.5365 22.7604 11.8938 21.7883C6.73606 20.7081 2.52887 16.0945 0 11.1325C0 11.1325 0.897908 9.22118 1.74087 8.00066C2.1185 7.45325 2.51484 6.9205 2.92989 6.40361C3.2479 6.00755 3.5776 5.62125 3.91841 5.24594C6.62324 2.27031 10.0939 -0.020609 14.2075 0.000139824ZM14.1859 2.44118C10.7427 2.42776 7.87949 4.4349 5.61426 6.9266C5.30619 7.26529 5.00923 7.61436 4.72162 7.97198C4.3434 8.4431 3.98213 8.92948 3.63781 9.42806C3.2935 9.92603 2.94042 10.5546 2.6604 11.0886C4.88998 14.9997 8.23667 18.5325 12.3538 19.3948C16.1904 20.1986 19.7709 17.9906 22.301 15.217C22.6102 14.8783 22.9089 14.5286 23.1977 14.1704C23.6069 13.662 23.9962 13.1366 24.3663 12.5965C24.7088 12.0967 25.0613 11.4669 25.3408 10.9324C23.027 6.88937 19.0683 2.52052 14.1859 2.44118Z"
                        fill="black"/>
                    <path
                        d="M14 6.11615C16.5867 6.11615 18.6871 8.30882 18.6871 11.0086C18.6871 13.709 16.5867 15.9011 14 15.9011C11.4138 15.9011 9.31345 13.709 9.31345 11.0086C9.31345 8.30882 11.4138 6.11615 14 6.11615ZM14 8.56269C15.2937 8.56269 16.3436 9.65871 16.3436 11.0086C16.3436 12.3591 15.2937 13.4551 14 13.4551C12.7069 13.4551 11.657 12.3591 11.657 11.0086C11.657 9.65871 12.7069 8.56269 14 8.56269Z"
                        fill="black"/>
                </svg>
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="LessonItemRow__row__id cursor_pointer" onClick={() => {
                changeSort(3)
            }}>
                id
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="LessonItemRow__row__position cursor_pointer" onClick={() => {
                changeSort(5)
            }}>
                pos
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>
            <div className="LessonItemRow__row__name cursor_pointer" onClick={() => {
                changeSort(7)
            }}>
                Название
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>
            <div className="LessonItemRow__row__subtitle">
                Подзаголовок
            </div>
            <div className="LessonItemRow__row__bpm cursor_pointer" onClick={() => {
                changeSort(9)
            }}>
                bpm
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>
            <div className="LessonItemRow__row__preview">Превью</div>
            <div className="LessonItemRow__row__path cursor_pointer" onClick={() => {
                changeSort(11)
            }}>
                Путь
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>
            <div className="LessonItemRow__row__fimbos">
                Связные фимбо
            </div>
            <div className="LessonItemRow__row__genres">
                Связные жанры
            </div>
            <div className="LessonItemRow__row__type cursor_pointer" onClick={() => {
                changeSort(13)
            }}>
                Тип
                <svg width="20" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="black"/>
                    <path d="M5.5 20L0.73686 11.75L10.2631 11.75L5.5 20Z" fill="black"/>
                </svg>
            </div>

            <div className="LessonItemRow__row__edit">

            </div>

        </div>
    );
})

export default LessonEmptyRow;