import React from 'react';
import "./VariableItemPage.scss"
import {Variable} from "../../models/Models";
import {useParams} from "react-router-dom";
import FailedFetchMessage from "../../components/Messages/FailedFetchMessage";
import Loading from "../../components/Loading/Loading";
import {VariableApi} from "../../store/services/VariablesApiService";
import VariableItemForm from "./components/VariableItemPage/VariableItemForm";

export interface IVariableItemPage{
    variable: Variable
}

export interface IVariableItemPageWithChanges{
    variable: Variable
    wasChanges: React.MutableRefObject<boolean>
}

const VariableItemPage = () => {
    const {id} = useParams()

    const {data: variable, isLoading, isError} = VariableApi.useFetchVariableQuery(id!)

    return (
        <>
            {isError &&
                <FailedFetchMessage/>
            }

            {(isLoading) ?
                <Loading/>
                :
                <>
                    {(variable) &&
                        <VariableItemForm variable={variable} />
                    }

                </>
            }

        </>
    );
};

export default VariableItemPage;