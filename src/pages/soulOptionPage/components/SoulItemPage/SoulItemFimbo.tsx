import React, {FC, useEffect, useState} from 'react';
import {FimboApi} from "../../../../store/services/FimboApiService";
import {ISoulItem} from "./SoulItemForm";
import SoulItemTextReason from "./SoulItemTextReason";

const SoulItemFimbo: FC<ISoulItem> = ({soul, wasChanges}) => {

    const {data: fimbos} = FimboApi.useFetchAllFimbosQuery('')

    const [conAllFimbos, setConAllFimbos] = useState(false)
    const [connectedFimbos, setConnectedFimbos] = useState<Array<number>>([])

    const deleteFromConFim = (value: number) => {
        setConnectedFimbos(connectedFimbos.filter(num => num !== value));
    }

    const addToConFim = (value: number) => {
        setConnectedFimbos([...connectedFimbos, value])
    }

    useEffect(() => {
        const ids: number[] = []
        soul.fimbos.map((fimbo) => (
            ids.push(fimbo.id)
        ))
        setConnectedFimbos(ids)
    }, [soul.fimbos]);

    return (
        <>
            {fimbos &&
                <>
                    <div className="SoulItemPage__form__item">

                        <div className="SoulItemPage__form__item_text">Связные фимбо</div>

                        <input style={{display: "none"}} name="connected_fimbos" type="text" onChange={() => {
                        }} value={connectedFimbos.join(',')}/>

                        <div className="SoulItemPage__form__item__column">
                            <div onClick={() => {
                                wasChanges.current = true
                                if (!conAllFimbos) {
                                    const Ids: Array<number> = []
                                    fimbos.rows.map((fimbo) => (
                                        Ids.push(fimbo.id)
                                    ))
                                    setConnectedFimbos(Ids)
                                    setConAllFimbos(true)
                                } else {
                                    setConAllFimbos(false)
                                    setConnectedFimbos([])
                                }
                            }} className="SoulItemPage__form__item__column__item">
                                <div
                                    className={conAllFimbos ? "SoulItemPage__form__item_column__square_green" : "SoulItemPage__form__item_column__square"}>
                                </div>
                                <div style={{marginLeft: 5}}>
                                    Выбрать все
                                </div>
                            </div>

                            {fimbos.rows.map(fimbo =>
                                <div onClick={() => {
                                    wasChanges.current = true
                                    if (connectedFimbos.includes(fimbo.id)) {
                                        deleteFromConFim(fimbo.id)
                                        setConAllFimbos(false)
                                    } else {
                                        if (connectedFimbos.length === fimbos.rows.length - 1)
                                            setConAllFimbos(true)

                                        addToConFim(fimbo.id)
                                    }
                                }} key={fimbo.id} className="SoulItemPage__form__item__column__item">
                                    <div
                                        className={connectedFimbos.includes(fimbo.id) ? "SoulItemPage__form__item_column__square_green" : "SoulItemPage__form__item_column__square"}>
                                    </div>
                                    <div style={{marginLeft: 5}}>
                                        {fimbo.name}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <SoulItemTextReason connectedFimbos={connectedFimbos} wasChanges={wasChanges} fimbos={fimbos}
                                        soul={soul}/>
                </>
            }
        </>
    );
};

export default SoulItemFimbo;