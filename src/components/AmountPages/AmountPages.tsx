import React, {FC, memo, useEffect, useState} from 'react';
import "./AmountPages.scss"
import {useSearchParams} from "react-router-dom";

interface IAmountPages {
    count: number
}

const AmountPages: FC<IAmountPages> = memo(({count}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const limit = 64
    const numOfPages = Math.ceil(count / limit)
    const [pages, setPages] = useState<number[]>([])

    const initState = searchParams.get("page") ? Number(searchParams.get("page")) : 1
    const [currentPage, setCurrentPage] = useState(initState)

    const addSearchParams = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }

    useEffect(() => {
        if ((count <= limit * (currentPage - 1)) && (currentPage > 1)){
            setCurrentPage(1)
            addSearchParams('page', "1")
        }
    }, [count]);

    const changePage = (num: number) => {
        setCurrentPage(num)
        addSearchParams('page', String(num))
    }

    useEffect(() => {
        const tempArr = []
        let start = currentPage - 3, end = currentPage + 2
        if (start < 0) {
            start = 0
        }
        if (end > numOfPages) {
            end = numOfPages
        }
        for (let i = start; i !== end; ++i) {
            tempArr.push(i + 1)
        }
        if (!tempArr.includes(1)) {
            tempArr.unshift(1)
        }
        if (!tempArr.includes(numOfPages)) {
            tempArr.push(numOfPages)
        }
        setPages(tempArr)
    }, [count, currentPage, numOfPages]);

    if (count <= limit) {
        return <></>
    }
    return (
        <div className="AmountPages__container">
            {pages.map(ent =>
                <div key={ent} onClick={() => {
                    window.scrollTo(0, 0)
                    changePage(ent)
                }} className={currentPage === ent ?
                    "AmountPages__page__item AmountPages__page__selected" : "AmountPages__page__item"}
                     style={ent === 1 ?
                         {borderBottomLeftRadius: 5, borderTopLeftRadius: 5, borderLeft: "1px solid lightgrey"} : (
                             ent === numOfPages ? {borderBottomRightRadius: 5, borderTopRightRadius: 5} : {})}
                >
                    {ent}
                </div>
            )}
        </div>
    );
})

export default AmountPages;