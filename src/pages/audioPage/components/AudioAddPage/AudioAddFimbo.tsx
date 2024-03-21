import React, {FC, useEffect, useState} from 'react';
import {IAudioAdd} from "../../AudioAddPage";
import {FimboApi} from "../../../../store/services/FimboApiService";

const AudioAddFimbo : FC<IAudioAdd>= ({wasChanges}) => {
    const {data: fimbos} = FimboApi.useFetchAllFimbosQuery('')

    const [connectedFimbo, setConnectedFimbo] = useState<number>(1)

    useEffect(() => {
        if (fimbos) {
            console.log(fimbos)
            setConnectedFimbo(fimbos.rows[0].id)
        }
    }, [fimbos]);

    return (
        <>
            {fimbos &&
                <div className="AudioAddPage__form__item">

                    <div className="AudioAddPage__form__item_text">Связные фимбо</div>

                    <input style={{display: "none"}} required name="fimbo_id" type="text" onChange={() => {}} value={connectedFimbo}/>

                    <div className="AudioAddPage__form__item__column">

                        {fimbos.rows.map(fimbo =>
                            <div onClick={() => {
                                wasChanges.current = true
                                setConnectedFimbo(fimbo.id)
                            }} key={fimbo.id} className="AudioAddPage__form__item__column__item">
                                <div
                                    className={fimbo.id === connectedFimbo ? "AudioAddPage__form__item_column__circle_green" : "AudioAddPage__form__item_column__circle"}>
                                </div>
                                <div style={{marginLeft: 5}}>
                                    {fimbo.name}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default AudioAddFimbo;