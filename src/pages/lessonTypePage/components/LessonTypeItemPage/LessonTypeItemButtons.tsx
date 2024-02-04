import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {LessonType} from "../../../../models/Models";
import AreYouSureDelete from "../../../../components/ModalWindow/AreYouSureDelete";
import AreYouSureSave from "../../../../components/ModalWindow/AreYouSureSave";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {LessonTypeApi} from "../../../../store/services/LessonTypeApiService";

const LessonTypeItemButtons = () => {
    const [sureSave, setSureSave] = useState(false)
    const [sureDelete, setSureDelete] = useState(false)
    const {id} = useParams()
    const [deleteLessonType, {isLoading: loadingDelete}] = LessonTypeApi.useDeleteLessonTypeMutation()

    const navigate = useNavigate()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const DeleteLessonType = () => {
        deleteLessonType(id!).then((result) => {
            const success = result as {data: LessonType}
            if (success.data) {
                dispatch(successShow( true))
                setTimeout(() => {
                    dispatch(successShow( false))
                }, 5000)
                navigate('/lesson-type')
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
            <div className="LessonTypeItemPage__form__button__container">
                <button type="button" className="LessonTypeItemPage__form__button_save" onClick={() => setSureSave(true)}>Сохранить</button>
                <button type="button" className="LessonTypeItemPage__form__button_delete" onClick={()=> {setSureDelete(true)}}>Удалить</button>
            </div>
            {sureDelete &&
                <AreYouSureDelete rejectModal={rejectDeleteModal} confirmModal={DeleteLessonType} />
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

export default LessonTypeItemButtons;