import React, {FC, useRef, useState} from 'react';
import {ISoulItem} from "./SoulItemForm";

const SoulItemBlock : FC<ISoulItem> = ({soul, wasChanges}) => {

    const types = useRef([
        {name: 'temperament', id: 0},
        {name: 'horoscope', id: 1},
        {name: 'color', id: 2}
    ])

    const [currentId, setCurrentId] = useState((types.current.find(ent => ent.name === soul.soul.block))!.id)

    return (
        <>
            <div className="SoulItemPage__form__item">
                <div className="SoulItemPage__form__item_text">Блок</div>
                <input style={{display: "none"}} name="block" type="text" value={types.current[currentId].name}
                       onChange={() => {
                       }}/>

                <div className="SoulItemPage__form__item__column">
                    {
                        types.current.map(ent =>
                            <div className="SoulItemPage__form__item__column__item" onClick={() => {
                                wasChanges.current = true
                                setCurrentId(ent.id)
                            }} key={ent.id}>
                                <div
                                    className={ent.id === currentId ? "SoulItemPage__form__item_column__circle_green" : "SoulItemPage__form__item_column__circle"}/>
                                <div style={{marginLeft: 5}}>
                                    {ent.name}
                                </div>
                            </div>
                        )}
                </div>
            </div>

        </>
    );
};

export default SoulItemBlock;