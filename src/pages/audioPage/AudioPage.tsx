import React from 'react';
import './AudioPage.scss'
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../store/hooks/redux";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import AmountPages from "../../components/AmountPages/AmountPages";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import {AudioApi} from "../../store/services/AudioApiService";
import {FimboApi} from "../../store/services/FimboApiService";
import AudioPageParams from "./components/AudioPage/AudioPageParams";
import AudioEmptyRow from "./components/AudioPage/AudioEmptyRow";
import AudioItemRow from "./components/AudioPage/AudioItemRow";

const AudioPage = () => {

    const [searchParams] = useSearchParams()
    const {data: audio, isLoading, isError} = AudioApi.useFetchAllAudiosQuery(searchParams.toString())
    const {data: fimbos, isLoading: fimbosLoading} = FimboApi.useFetchAllFimbosQuery('')
    const {host} = useAppSelector(state => state.hostReducer)

    return (
        <>
            <AudioPageParams/>

            <AudioEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }


            {(isLoading || fimbosLoading) ?
                <Loading/>
                :
                <>
                    {(audio && fimbos) &&
                        audio.rows.map((ent, index) =>
                            <AudioItemRow fimbos={fimbos.rows} filesHost={host} index={index} audio={ent} key={ent.id}/>
                        )
                    }

                    {audio &&
                        <AmountPages count={audio.count}/>
                    }

                    {audio &&
                    (audio.count === 0) ?
                        <NoFoundMessage/>
                        :
                        <></>
                    }

                </>
            }



        </>
    );
};

export default AudioPage;