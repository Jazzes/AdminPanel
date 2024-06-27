import React, {FormEvent, useRef} from 'react';
import {errorSlice, successSlice} from "../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import {Genre} from "../../models/Models";
import "./GenreAddPage.scss"
import ButtonBack from "../../components/Buttons/ButtonBack";
import FetchLoading from "../../components/Loading/FetchLoading";
import {GenreApi} from "../../store/services/GenreApiService";
import GenreAddInfoLeft from "./components/GenreAddPage/GenreAddInfoLeft";
import GenreAddInfoRight from "./components/GenreAddPage/GenreAddInfoRight";

export interface IGenreAdd {
    wasChanges: React.MutableRefObject<boolean>
}

const GenreAddPage = () => {
    const [createGenre, {isLoading}] = GenreApi.useCreateGenreMutation()
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

        const newJson: Genre = {
            id: 0,
            name: String(formJson.name)
        }

        createGenre(newJson).then(async (result) => {
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


    return (
        <>
            <div className="GenreAddPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="GenreAddPage__form" onSubmit={handleSubmit}>
                    <div className="GenreAddPage__form_left">
                        <GenreAddInfoLeft wasChanges={wasChanges}/>
                    </div>
                    <div className="GenreAddPage__form_right">
                        <GenreAddInfoRight wasChanges={wasChanges}/>
                    </div>
                    <button className="GenreAddPage__form__button" type='submit'>Добавить</button>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default GenreAddPage;