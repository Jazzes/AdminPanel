import React from 'react';
import "./FimboPage.scss"
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../store/hooks/redux";
import {FimboApi} from "../../store/services/FimboApiService";
import FimboPageParams from "./components/FimboPage/FimboPageParams";
import FimboEmptyRow from "./components/FimboPage/FimboEmptyRow";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import AmountPages from "../../components/AmountPages/AmountPages";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import FimboItemRow from "./components/FimboPage/FimboItemRow";

const FimboPage = () => {

    const [searchParams] = useSearchParams()
    const {data: fimbo, isLoading, isError} = FimboApi.useFetchAllFimbosQuery(searchParams.toString())
    const {host} = useAppSelector(state => state.hostReducer)

    return (
        <>

            <FimboPageParams/>

            <FimboEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }

            {isLoading ?
                <Loading/>
                :
                <>
                    {(fimbo) &&
                        fimbo.rows.map((ent, index) =>
                            <FimboItemRow fimbo={ent} index={index} filesHost={host} key={ent.id}/>
                        )
                    }

                    {fimbo &&
                        <AmountPages count={fimbo.count}/>
                    }

                    {fimbo &&
                    (fimbo.count === 0)
                        ?
                        <NoFoundMessage/>
                        :
                        <></>
                    }

                </>
            }

        </>
    );
};

export default FimboPage;