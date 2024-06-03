import React, {FC, FormEvent, useRef} from 'react';
import {Soul} from "../../../../models/Models";
import ButtonBack from "../../../../components/Buttons/ButtonBack";
import SoulItemInfoLeft from "./SoulItemInfoLeft";
import SoulItemInfoRight from "./SoulItemInfoRight";
import {ISoulOneResponse} from "../../../../models/StoreModels";
import SoulItemButtons from "./SoulItemButtons";
import {errorSlice, successSlice} from "../../../../store/reducer/MessagesSlice";
import {useAppDispatch} from "../../../../store/hooks/redux";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import {SoulApi} from "../../../../store/services/SoulOptionApiService";
export interface ISoulItemForm{
    soul: ISoulOneResponse
}
export interface ISoulItem{
    wasChanges: React.MutableRefObject<boolean>
    soul: ISoulOneResponse
}

const SoulItemForm : FC<ISoulItemForm> = ({soul}) => {

    const wasChanges = useRef(false)
    const [changeSoul, {isLoading: changeLoading}] = SoulApi.useChangeSoulMutation()
    const [changeLinks, {isLoading: changeLinksLoading}] = SoulApi.useChangeSoulFimboLinksMutation()

    const {successShow} = successSlice.actions
    const {errorShow} = errorSlice.actions
    const dispatch = useAppDispatch()

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (wasChanges.current) {

            const form = e.currentTarget
            const formData = new FormData(form)
            const formJson = Object.fromEntries(formData.entries())

            const newJson: Soul = {
                id: soul.soul.id,
                additional_info: String(formJson.additional_info),
                block: String(formJson.block),
                text: String(formJson.text),
                position: Number(formJson.position)
            }

            changeSoul(newJson).then(async (result) => {
                const success = result as { data: Soul }
                if (success.data) {
                    const connected_fimbos = String(formJson.connected_fimbos).split(',').map(ent => Number(ent)).filter(ent => ent !== 0)
                    await changeLinks({
                        fimbos: connected_fimbos,
                        soul_option_id: success.data.id
                    })

                    dispatch(successShow(true))
                    setTimeout(() => {
                        dispatch(successShow(false))
                    }, 5000)
                    wasChanges.current = false
                } else {
                    dispatch(errorShow(true))
                    setTimeout(() => {
                        dispatch(errorShow(false))
                    }, 5000)
                }
            })
        }
    }

    return (
        <div className="SoulItemPage__container">
            <ButtonBack wasChanges={wasChanges}/>
            <form className="SoulItemPage__form" onSubmit={handleSubmit}>
                <div className="SoulItemPage__form_left">
                    <SoulItemInfoLeft soul={soul} wasChanges={wasChanges}/>
                </div>
                <div className="SoulItemPage__form_right">
                    <SoulItemInfoRight soul={soul} wasChanges={wasChanges}/>
                </div>
                <SoulItemButtons/>
            </form>

            {(changeLoading || changeLinksLoading) &&
                <FetchLoading/>
            }
        </div>
    );
};

export default SoulItemForm;