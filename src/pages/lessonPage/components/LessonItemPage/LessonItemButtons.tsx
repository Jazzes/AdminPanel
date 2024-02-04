import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {LessonApi} from "../../../../store/services/LessonApiService";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Lesson} from "../../../../models/Models";
import AreYouSureDelete from "../../../../components/ModalWindow/AreYouSureDelete";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import AreYouSureSave from "../../../../components/ModalWindow/AreYouSureSave";

const LessonItemButtons = () => {

    const [sureSave, setSureSave] = useState(false)
    const [sureDelete, setSureDelete] = useState(false)
    const {id} = useParams()
    const [deleteLesson, {isLoading: loadingDelete}] = LessonApi.useDeleteLessonMutation()

    const navigate = useNavigate()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const DeleteLesson = () => {
        deleteLesson(id!).then((result) => {
            const success = result as {data: Lesson}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/lesson')
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
            <div className="LessonItemPage__form__button__container">
                <button type="button" className="LessonItemPage__form__button_save" onClick={() => setSureSave(true)}>Сохранить</button>
                <button type="button" className="LessonItemPage__form__button_delete" onClick={()=> {setSureDelete(true)}}>Удалить</button>
            </div>
            {sureDelete &&
                <AreYouSureDelete rejectModal={rejectDeleteModal} confirmModal={DeleteLesson} />
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

export default LessonItemButtons;