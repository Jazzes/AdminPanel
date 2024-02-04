import React, {FormEvent, useRef} from 'react';
import "./VariableAddPage.scss"
import {errorSlice, successSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import {Variable} from "../../models/Models";
import ButtonBack from "../../components/Buttons/ButtonBack";
import {VariableApi} from "../../store/services/VariablesApiService";
import VariableAddInfoLeft from "./components/VariableAddPage/VariableAddInfoLeft";
import VariableAddInfoRight from "./components/VariableAddPage/VariableAddInfoRight";

export interface IVariableAddPage {
    wasChanges: React.MutableRefObject<boolean>
}

const VariableAddPage = () => {
    const [createVariable] = VariableApi.useCreateVariableMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        let newJson: Variable = {
            id: 0,
            name: String(formJson.name),
            value_of: String(formJson.value_of),
            description: String(formJson.description)
        }
        createVariable(newJson).then(async (result) => {
            const success = result as { data: Variable }
            if (success.data) {
                dispatch(successShow(true))
                setTimeout(() => {
                    dispatch(successShow(false))
                }, 5000)
                navigate('/variable')
            } else {
                dispatch(errorShow(true))
                setTimeout(() => {
                    dispatch(errorShow(false))
                }, 5000)
            }
        })
    }

    return (
        <div className="VariableAddPage__container">
            <ButtonBack wasChanges={wasChanges}/>
            <form className="VariableAddPage__form" onSubmit={handleSubmit}>
                <div className="VariableAddPage__form_left">
                    <VariableAddInfoLeft wasChanges={wasChanges}/>
                </div>
                <div className="VariableAddPage__form_right">
                    <VariableAddInfoRight wasChanges={wasChanges}/>
                </div>

                <button className="VariableAddPage__form__button" type='submit'>Добавить</button>
            </form>
        </div>
    );
};

export default VariableAddPage;