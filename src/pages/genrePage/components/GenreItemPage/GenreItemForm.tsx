import React, {FC, FormEvent, useRef} from 'react';
import {IGenreItem} from "../../GenreItemPage";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Genre } from "../../../../models/Models";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {GenreApi} from "../../../../store/services/GenreApiService";
import GenreItemInfoLeft from "./GenreItemInfoLeft";
import GenreItemInfoRight from "./GenreItemInfoRight";
import GenreItemButtons from "./GenreItemButtons";

const GenreItemForm : FC<IGenreItem>= ({genre}) => {

    const [changeGenre, {isLoading}] = GenreApi.useChangeGenreMutation()
    const wasChanges = useRef(false)
    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        const newJson: Genre = {
            id: genre.id,
            name: String(formJson.name),
            position: Number(formJson.position)
        }

        changeGenre(newJson).then(async (result) => {
            const success = result as {data: Genre}
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
            <div className="GenreItemPage__container">
                <ButtonBack wasChanges={wasChanges}/>
                <form className="GenreItemPage__form" onSubmit={handleSubmit}>
                    <div className="GenreItemPage__form_left">
                        <GenreItemInfoLeft genre={genre} wasChanges={wasChanges}/>
                    </div>
                    <div className="GenreItemPage__form_right">
                        <GenreItemInfoRight genre={genre} wasChanges={wasChanges}/>
                    </div>
                    <GenreItemButtons/>
                </form>
            </div>

            {(isLoading) &&
                <FetchLoading/>
            }
        </>
    );
};

export default GenreItemForm;