import React from 'react';
import './AudioItemPage.scss'
import {Audio} from "../../models/Models";
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import {AudioApi} from "../../store/services/AudioApiService";
import AudioItemForm from "./components/AudioItemPage/AudioItemForm";

export interface AudioItem{
    audio: Audio
}

export interface AudioItemWithChange{
    audio: Audio
    wasChanges: React.MutableRefObject<boolean>
}

const AudioItemPage = () => {
    const {id} = useParams()

    const {data: audio, isLoading, isError} = AudioApi.useFetchAudioQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(audio) &&
                        <AudioItemForm audio={audio} />
                    }

                </>
            }

        </>
    );
};

export default AudioItemPage;