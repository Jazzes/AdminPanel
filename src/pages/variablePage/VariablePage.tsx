import React from 'react';
import "./VariablePage.scss"
import {useSearchParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import AmountPages from "../../components/AmountPages/AmountPages";
import NoFoundMessage from "../../components/NoFound/NoFoundMessage";
import {VariableApi} from "../../store/services/VariablesApiService";
import VariableItemRow from "./components/VariablePage/VariableItemRow";
import VariableEmptyRow from "./components/VariablePage/VariableEmptyRow";
import VariablePageParams from "./components/VariablePage/VariablePageParams";

const VariablePage = () => {
    const [searchParams] = useSearchParams()
    const {data: variable, isLoading, isError} = VariableApi.useFetchAllVariablesQuery(searchParams.toString())


    return (
        <>
            <VariablePageParams/>

            <VariableEmptyRow/>

            {isError &&
                <FailedFetchMessage/>
            }

            {isLoading ?
                <Loading/>
                :
                <>
                    {(variable) &&
                        variable.rows.map((ent, index) =>
                            <VariableItemRow variable={ent} index={index} key={ent.id}/>
                        )
                    }

                    {variable &&
                        <AmountPages count={variable.count}/>
                    }

                    {variable &&
                    (variable.count === 0)
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

export default VariablePage;