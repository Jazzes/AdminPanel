import React from 'react';
import "./GenreItemPage.scss"
import {Genre} from "../../models/Models";
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import {GenreApi} from "../../store/services/GenreApiService";
import GenreItemForm from "./components/GenreItemPage/GenreItemForm";

export interface IGenreItem{
    genre: Genre
}

export interface IGenreItemWithChange{
    genre: Genre
    wasChanges: React.MutableRefObject<boolean>
}

const GenreItemPage = () => {
    const {id} = useParams()

    const {data: genre, isLoading, isError} = GenreApi.useFetchGenreQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(genre) &&
                        <GenreItemForm genre={genre}/>
                    }

                </>
            }

        </>
    );
};

export default GenreItemPage;