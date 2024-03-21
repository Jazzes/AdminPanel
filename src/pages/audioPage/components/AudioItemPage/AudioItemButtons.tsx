import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Audio} from "../../../../models/Models";
import AreYouSureDelete from "../../../../components/ModalWindow/AreYouSureDelete";
import AreYouSureSave from "../../../../components/ModalWindow/AreYouSureSave";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {AudioApi} from "../../../../store/services/AudioApiService";

const AudioItemButtons = () => {
    const [sureSave, setSureSave] = useState(false)
    const [sureDelete, setSureDelete] = useState(false)
    const {id} = useParams()
    const [deleteAudio, {isLoading: loadingDelete}] = AudioApi.useDeleteAudioMutation()

    const navigate = useNavigate()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const DeleteAudio = () => {
        deleteAudio(id!).then((result) => {
            const success = result as {data: Audio}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/audio')
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
            <div className="AudioItemPage__form__button__container">
                <button type="button" className="AudioItemPage__form__button_save" onClick={() => setSureSave(true)}>Сохранить</button>
                <button type="button" className="AudioItemPage__form__button_delete" onClick={()=> {setSureDelete(true)}}>Удалить</button>
            </div>
            {sureDelete &&
                <AreYouSureDelete rejectModal={rejectDeleteModal} confirmModal={DeleteAudio} />
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

export default AudioItemButtons;