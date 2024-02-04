import React from 'react';
import "./GenrePage.scss"
import {useSearchParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import AmountPages from "../../components/AmountPages/AmountPages";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import {GenreApi} from "../../store/services/GenreApiService";
import GenrePageParams from "./components/GenrePage/GenrePageParams";
import GenreEmptyRow from "./components/GenrePage/GenreEmptyRow";
import GenreItemRow from "./components/GenrePage/GenreItemRow";

const GenrePage = () => {

    const [searchParams] = useSearchParams()
    const {data: genre, isLoading, isError} = GenreApi.useFetchAllGenresQuery(searchParams.toString())
    return (
        <>

            <GenrePageParams/>

            <GenreEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }

            {isLoading ?
                <Loading/>
                :
                <>
                    {(genre) &&
                        genre.rows.map((ent, index) =>
                            <GenreItemRow genre={ent} index={index} key={ent.id}/>
                        )
                    }

                    {genre &&
                        <AmountPages count={genre.count}/>
                    }

                    {genre &&
                    (genre.count === 0)
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

export default GenrePage;