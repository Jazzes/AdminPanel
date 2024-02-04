import React from 'react';
import "./LessonItemPage.scss"
import {LessonApi} from "../../store/services/LessonApiService";
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import "./LessonItemPage.scss"
import LessonItemForm from "./components/LessonItemPage/LessonItemForm";
const LessonItemPage = () => {

    const {id} = useParams()

    const {data: lesson, isLoading, isError} = LessonApi.useFetchLessonQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(lesson) &&
                        <LessonItemForm lesson={lesson} />
                    }

                </>
            }
            
        </>
    );
};

export default LessonItemPage;