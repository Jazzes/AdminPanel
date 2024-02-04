import React, {FC, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Variable} from "../../../../models/Models";
import AreYouSureDelete from "../../../../components/ModalWindow/AreYouSureDelete";
import AreYouSureSave from "../../../../components/ModalWindow/AreYouSureSave";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {VariableApi} from "../../../../store/services/VariablesApiService";

const VariableItemButtons : FC = () => {
    const [sureSave, setSureSave] = useState(false)
    const [sureDelete, setSureDelete] = useState(false)
    const {id} = useParams()
    const [deleteVariable, {isLoading: loadingDelete}] = VariableApi.useDeleteVariableMutation()

    const navigate = useNavigate()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const DeleteVariable = () => {
        deleteVariable(id!).then((result) => {
            const success = result as {data: Variable}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/variable')
            } else{
                dispatch(errorShow( true))
                setTimeout(() => {
                    dispatch(errorShow( false))
                }, 5000)
            }
        })
    }

    const rejectDeleteModal = () => {
        setSureDelete(false)
    }
    const rejectSaveModal = () => {
        setSureSave(false)
    }

    return (
        <>
            <div className="VariableItemPage__form__button__container">
                <button type="button" className="VariableItemPage__form__button_save" onClick={() => setSureSave(true)}>Сохранить</button>
                <button type="button" className="VariableItemPage__form__button_delete" onClick={()=> {setSureDelete(true)}}>Удалить</button>
            </div>
            {sureDelete &&
                <AreYouSureDelete rejectModal={rejectDeleteModal} confirmModal={DeleteVariable} />
            }
            {sureSave &&
                <AreYouSureSave rejectModal={rejectSaveModal}/>
            }

            {loadingDelete &&
                <FetchLoading/>
            }
        </>
    );
};

export default VariableItemButtons;