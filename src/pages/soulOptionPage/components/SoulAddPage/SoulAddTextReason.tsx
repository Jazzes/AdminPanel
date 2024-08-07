import React, {FC, useEffect, useState} from 'react';
import {IFimboResponse} from "../../../../models/StoreModels";

interface ISoulItemTextReason {
    wasChanges: React.MutableRefObject<boolean>
    fimbos: IFimboResponse
    connectedFimbos: number[]
}

interface IReasons {
    [key: number]: string[]
}

const SoulAddTextReason : FC<ISoulItemTextReason> = ({fimbos, connectedFimbos, wasChanges}) => {

    const [reasons, setReasons] = useState<IReasons>({})

    useEffect(() => {
        const p: IReasons = {...reasons}
        connectedFimbos.forEach((ent) => {
            if (!p[ent]) {
                p[ent] = ['']
            }
        })
        setReasons(p)
    }, [connectedFimbos])

    const addEntity = (id: number) => {
        const p: IReasons = {...reasons}
        p[id] = [...p[id], '']
        setReasons(p)
    }

    const deleteEntity = (id: number) => {
        const p: IReasons = {...reasons}
        p[id] = [...(p[id].splice(p[id].length - 1, 1))]
        setReasons(p)
    }

    const findFimboName = (id: number) => {
        let name = fimbos.rows.find((ent) => ent.id === id)
        return name!.name
    }

    return (
        <>
            {connectedFimbos.map((entId) =>
                <div key={entId + "z"}>
                    {reasons[entId] ?
                        <>
                            {reasons[entId].map((ent, index) =>
                                <div key={index} className="SoulAddPage__form__item__r">
                                    <div className="SoulAddPage__form__item" style={{marginBottom: "3px"}}>
                                        <div
                                            className="SoulAddPage__form__item_text">№{index + 1} Автотекст ответа Фимбо {findFimboName(entId)}
                                        </div>
                                        <textarea wrap="soft" autoComplete={"off"} onChange={() => {
                                            wasChanges.current = true
                                        }} name={"text_reason_" + entId + "_" + index} defaultValue={ent}
                                                  className="SoulAddPage__form__item_textarea"></textarea>
                                    </div>
                                </div>
                            )}
                        </>
                        : <></>
                    }

                    <div className="hint__description__field">
                        Текст, который покажется в случае, если человек выбрал данный ответ в выборе Фимбо по душе.
                    </div>

                    <div className="SoulAddPage__form__item__plusMinus" style={{marginTop: "3px"}}>
                        <div className="SoulAddPage__form__item__plusMinus__plus" onClick={() => {
                            addEntity(entId)
                        }}>
                            +
                        </div>
                        {reasons[entId] ?
                            <>
                                {reasons[entId].length > 1 &&
                                    <div className="SoulAddPage__form__item__plusMinus__minus" onClick={() => {
                                        deleteEntity(entId)
                                    }}>
                                        -
                                    </div>
                                }
                            </>
                            : <></>
                        }
                    </div>

                </div>
            )}
        </>
    );
};

export default SoulAddTextReason;