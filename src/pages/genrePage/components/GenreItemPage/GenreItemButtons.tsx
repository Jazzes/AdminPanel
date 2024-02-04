import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Genre} from "../../../../models/Models";
import AreYouSureDelete from "../../../../components/ModalWindow/AreYouSureDelete";
import AreYouSureSave from "../../../../components/ModalWindow/AreYouSureSave";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {GenreApi} from "../../../../store/services/GenreApiService";

const GenreItemButtons = () => {
    const [sureSave, setSureSave] = useState(false)
    const [sureDelete, setSureDelete] = useState(false)
    const {id} = useParams()
    const [deleteGenre, {isLoading: loadingDelete}] = GenreApi.useDeleteGenreMutation()

    const navigate = useNavigate()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const DeleteGenre = () => {
        deleteGenre(id!).then((result) => {
            const success = result as {data: Genre}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/genre')
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
            <div className="GenreItemPage__form__button__container">
                <button type="button" className="GenreItemPage__form__button_save" onClick={() => setSureSave(true)}>Сохранить</button>
                <button type="button" className="GenreItemPage__form__button_delete" onClick={()=> {setSureDelete(true)}}>Удалить</button>
            </div>
            {sureDelete &&
                <AreYouSureDelete rejectModal={rejectDeleteModal} confirmModal={DeleteGenre} />
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

export default GenreItemButtons;