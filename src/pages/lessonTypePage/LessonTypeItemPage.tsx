import React from 'react';
import "./LessonTypeItemPage.scss"
import {LessonType} from "../../models/Models";
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import {LessonTypeApi} from "../../store/services/LessonTypeApiService";
import LessonTypeItemForm from "./components/LessonTypeItemPage/LessonTypeItemForm";

export interface ILessonTypeItemPage{
    lessonType: LessonType
}

export interface ILessonTypeItemPageWithChanges{
    lessonType: LessonType
    wasChanges: React.MutableRefObject<boolean>
}

const LessonTypeItemPage = () => {
    const {id} = useParams()

    const {data: lessonType, isLoading, isError} = LessonTypeApi.useFetchLessonTypeQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(lessonType) &&
                        <LessonTypeItemForm lessonType={lessonType} />
                    }

                </>
            }

        </>
    );
};

export default LessonTypeItemPage;