import React from 'react';
import "./LessonTypePage.scss"
import {LessonTypeApi} from "../../store/services/LessonTypeApiService";
import LessonTypeEmptyRow from "./components/LessonTypePage/LessonTypeEmptyRow";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import AmountPages from "../../components/AmountPages/AmountPages";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import LessonTypeItemRow from "./components/LessonTypePage/LessonTypeItemRow";
import LessonTypePageParams from "./components/LessonTypePage/LessonTypePageParams";
import {useSearchParams} from "react-router-dom";

const LessonTypePage = () => {
    const [searchParams] = useSearchParams()
    const {data: lessonType, isLoading, isError} = LessonTypeApi.useFetchAllLessonTypesQuery(searchParams.toString())


    return (
        <>
            <LessonTypePageParams/>

            <LessonTypeEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }

            {isLoading ?
                <Loading/>
                :
                <>
                    {(lessonType) &&
                        lessonType.rows.map((ent, index) =>
                            <LessonTypeItemRow lessonType={ent} index={index} key={ent.id}/>
                        )
                    }

                    {lessonType &&
                        <AmountPages count={lessonType.count}/>
                    }

                    {lessonType &&
                    (lessonType.count === 0)
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

export default LessonTypePage;