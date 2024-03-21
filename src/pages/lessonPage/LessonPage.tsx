import React from 'react';
import "./LessonPage.scss"
import {LessonApi} from "../../store/services/LessonApiService";
import LessonItemRow from "./components/LessonPage/LessonItemRow";
import AmountPages from "../../components/AmountPages/AmountPages";
import LessonPageParams from "./components/LessonPage/LessonPageParams";
import {LessonTypeApi} from "../../store/services/LessonTypeApiService";
import Loading from "../../components/Loading/Loading";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import LessonEmptyRow from "./components/LessonPage/LessonEmptyRow";
import {useSearchParams} from "react-router-dom";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import {useAppSelector} from "../../store/hooks/redux";

const LessonPage = () => {

    const [searchParams] = useSearchParams()
    const {data: lesson, isLoading, isError} = LessonApi.useFetchAllLessonsQuery(searchParams.toString())
    const {data: lessonTypes, isLoading: lessonTypeLoading} = LessonTypeApi.useFetchAllLessonTypesQuery('')
    const {host} = useAppSelector(state => state.hostReducer)

    return (
        <>

            <LessonPageParams/>

            <LessonEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }


            {(isLoading || lessonTypeLoading) ?
                <Loading/>
                :
                <>
                    {(lesson && lessonTypes) &&
                        lesson.rows.map((ent, index) =>
                            <LessonItemRow lessonTypes={lessonTypes.rows} filesHost={host} index={index} lesson={ent} key={ent.id}/>
                        )
                    }

                    {lesson &&
                        <AmountPages count={lesson.count}/>
                    }

                    {lesson &&
                        (lesson.count === 0) ?
                            <NoFoundMessage/>
                        :
                        <></>
                    }

                </>
            }



        </>
    );
};

export default LessonPage;