import React from 'react';
import "./SoulItemPage.scss"
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import "./SoulItemPage.scss"
import SoulItemForm from "./components/SoulItemPage/SoulItemForm";
import {SoulApi} from "../../store/services/SoulOptionApiService";
const SoulItemPage = () => {

    const {id} = useParams()

    const {data: soul, isLoading, isError} = SoulApi.useFetchSoulQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(soul) &&
                        <SoulItemForm soul={soul} />
                    }

                </>
            }
            
        </>
    );
};

export default SoulItemPage;