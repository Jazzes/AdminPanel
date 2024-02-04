import React, {useState} from 'react';
import AreYouSureDelete from "../../../../components/ModalWindow/AreYouSureDelete";
import AreYouSureSave from "../../../../components/ModalWindow/AreYouSureSave";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {useNavigate, useParams} from "react-router-dom";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Fimbo} from "../../../../models/Models";
import {FimboApi} from "../../../../store/services/FimboApiService";

const FimboItemButtons = () => {
    const [sureSave, setSureSave] = useState(false)
    const [sureDelete, setSureDelete] = useState(false)
    const {id} = useParams()
    const [deleteFimbo, {isLoading: loadingDelete}] = FimboApi.useDeleteFimboMutation()

    const navigate = useNavigate()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const DeleteFimbo = () => {
        deleteFimbo(id!).then((result) => {
            const success = result as {data: Fimbo}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/fimbo')
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
            <div className="FimboItemPage__form__button__container">
                <button type="button" className="FimboItemPage__form__button_save" onClick={() => setSureSave(true)}>Сохранить</button>
                <button type="button" className="FimboItemPage__form__button_delete" onClick={()=> {setSureDelete(true)}}>Удалить</button>
            </div>
            {sureDelete &&
                <AreYouSureDelete rejectModal={rejectDeleteModal} confirmModal={DeleteFimbo} />
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

export default FimboItemButtons;