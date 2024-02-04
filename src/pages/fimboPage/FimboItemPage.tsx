import React from 'react';
import "./FimboItemPage.scss"
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import {FimboApi} from "../../store/services/FimboApiService";
import {Fimbo} from "../../models/Models";
import FimboItemForm from "./components/FimboItemPage/FimboItemForm";

export interface FimboItem{
    fimbo: Fimbo
}

export interface FimboItemWithChange{
    fimbo: Fimbo
    wasChanges: React.MutableRefObject<boolean>
}


const FimboItemPage = () => {
    const {id} = useParams()

    const {data: fimbo, isLoading, isError} = FimboApi.useFetchFimboQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(fimbo) &&
                        <FimboItemForm fimbo={fimbo} />
                    }

                </>
            }

        </>
    );
};

export default FimboItemPage;