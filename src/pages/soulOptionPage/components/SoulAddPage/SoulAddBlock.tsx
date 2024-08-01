import React, {FC, useRef, useState} from 'react';
import {ISoulAdd} from "./SoulAddInfoLeft";

const SoulAddBlock: FC<ISoulAdd> = ({wasChanges}) => {

    const types = useRef([
        {name: 'temperament', id: 0},
        {name: 'horoscope', id: 1},
        {name: 'color', id: 2}
    ])

    const [currentId, setCurrentId] = useState(2)

    return (
        <div className="SoulAddPage__form__item">
            <div className="SoulAddPage__form__item_text">Блок</div>
            <input style={{display: "none"}} name="block" type="text" value={types.current[currentId].name}
                   onChange={() => {

                   }}/>
            <div className="SoulAddPage__form__item__column">
                {
                    types.current.map(ent =>
                        <div style={ent.id !== 2 ? {pointerEvents: "none", color: "gray"} : {}} className="SoulAddPage__form__item__column__item" onClick={() => {
                            wasChanges.current = true
                            setCurrentId(ent.id)
                        }} key={ent.id}>
                            <div
                                className={ent.id === currentId ? "SoulAddPage__form__item_column__circle_green" : "SoulAddPage__form__item_column__circle"}/>
                            <div style={{marginLeft: 5}}>
                                {ent.name}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default SoulAddBlock;