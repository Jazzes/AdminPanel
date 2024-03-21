import React, {FC, useState} from 'react';
import {AudioItemWithChange} from "../../AudioItemPage";
import {FimboApi} from "../../../../store/services/FimboApiService";

const AudioItemFimbo : FC<AudioItemWithChange>= ({audio, wasChanges}) => {
    const {data: fimbos} = FimboApi.useFetchAllFimbosQuery('')

    const [connectedFimbo, setConnectedFimbo] = useState<number>(audio.fimbo_id)

    return (
        <>
            {fimbos &&
                <div className="AudioItemPage__form__item">

                    <div className="AudioItemPage__form__item_text">Связные фимбо</div>

                    <input style={{display: "none"}} required name="fimbo_id" type="text" onChange={() => {}} value={connectedFimbo}/>

                    <div className="AudioItemPage__form__item__column">

                        {fimbos.rows.map(fimbo =>
                            <div onClick={() => {
                                wasChanges.current = true
                                setConnectedFimbo(fimbo.id)
                            }} key={fimbo.id} className="AudioItemPage__form__item__column__item">
                                <div
                                    className={fimbo.id === connectedFimbo ? "AudioItemPage__form__item_column__circle_green" : "AudioItemPage__form__item_column__circle"}>
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

export default AudioItemFimbo;