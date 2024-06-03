import React from 'react';
import "./SoulPage.scss"
import SoulItemRow from "./components/SoulPage/SoulItemRow";
import AmountPages from "../../components/AmountPages/AmountPages";
import SoulPageParams from "./components/SoulPage/SoulPageParams";
import Loading from "../../components/Loading/Loading";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import SoulEmptyRow from "./components/SoulPage/SoulEmptyRow";
import {useSearchParams} from "react-router-dom";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import {SoulApi} from "../../store/services/SoulOptionApiService";

const SoulPage = () => {

    const [searchParams] = useSearchParams()
    const {data: soul, isLoading, isError} = SoulApi.useFetchAllSoulsQuery(searchParams.toString())

    return (
        <>

            <SoulPageParams/>

            <SoulEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }


            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(soul) &&
                        soul.rows.map((ent, index) =>
                            <SoulItemRow index={index} soul={ent} key={ent.id}/>
                        )
                    }

                    {soul &&
                        <AmountPages count={soul.count}/>
                    }

                    {soul &&
                        (soul.count === 0) ?
                            <NoFoundMessage/>
                        :
                        <></>
                    }

                </>
            }



        </>
    );
};

export default SoulPage;