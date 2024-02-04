import React, {FC, FormEvent, useRef} from 'react';
import {IVariableItemPage} from "../../VariableItemPage";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Variable} from "../../../../models/Models";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {VariableApi} from "../../../../store/services/VariablesApiService";
import VariableItemInfoLeft from "./VariableItemInfoLeft";
import VariableItemInfoRight from "./VariableItemInfoRight";
import VariableItemButtons from "./VariableItemButtons";

const VariableItemForm : FC<IVariableItemPage> = ({variable}) => {
    const [changeVariable, {isLoading}] = VariableApi.useChangeVariableMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        let newJson: Variable = {
            id: variable.id,
            name: String(formJson.name),
            value_of: String(formJson.value_of),
            description: String(formJson.description)
        }
        changeVariable(newJson).then(async (result) => {
            const success = result as {data: Variable}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                wasChanges.current = false
            } else{
                dispatch(errorShow( true))
                setTimeout(() => {
                    dispatch(errorShow( false))
                }, 5000)
            }
        })
    }

    return (
        <>
            <div className="VariableItemPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="VariableItemPage__form" onSubmit={handleSubmit}>
                    <div className="VariableItemPage__form_left">
                        <VariableItemInfoLeft wasChanges={wasChanges} variable={variable}/>
                    </div>
                    <div className="VariableItemPage__form_right">
                        <VariableItemInfoRight wasChanges={wasChanges} variable={variable}/>
                    </div>
                    <VariableItemButtons/>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default VariableItemForm;