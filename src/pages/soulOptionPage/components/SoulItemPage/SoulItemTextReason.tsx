import React, {FC, useEffect, useState} from 'react';
import {IFimboResponse, ISoulOneResponse} from "../../../../models/StoreModels";

interface ISoulItemTextReason {
    soul: ISoulOneResponse,
    wasChanges: React.MutableRefObject<boolean>
    fimbos: IFimboResponse
    connectedFimbos: number[]
}

interface IReasons {
    [key: number]: string[]
}

const SoulItemTextReason: FC<ISoulItemTextReason> = ({soul, fimbos, connectedFimbos, wasChanges}) => {

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

    useEffect(() => {
        const p: IReasons = {}
        soul.fimbos.forEach((ent) => {
            p[ent.id] = ent.soul_fimbo_link.text_reason
        })
        setReasons(p)
    }, [soul.fimbos])

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
                                <div key={index} className="SoulItemPage__form__item__r">
                                    <div className="SoulItemPage__form__item" style={{marginBottom: "3px"}}>
                                        <div
                                            className="SoulItemPage__form__item_text">№{index + 1} Автотекст ответа Фимбо {findFimboName(entId)}
                                        </div>
                                        <textarea wrap="soft" autoComplete={"off"} onChange={() => {
                                            wasChanges.current = true
                                        }} name={"text_reason_" + entId + "_" + index} defaultValue={ent}
                                                  className="SoulItemPage__form__item_textarea"></textarea>
                                    </div>
                                </div>
                            )}
                        </>
                        : <></>
                    }

                    <div className="hint__description__field">
                        Текст, который покажется в случае, если человек выбрал данный ответ в выборе Фимбо по душе.
                    </div>

                    <div className="SoulItemPage__form__item__plusMinus" style={{marginTop: "3px"}}>
                        <div className="SoulItemPage__form__item__plusMinus__plus" onClick={() => {
                            addEntity(entId)
                        }}>
                            +
                        </div>
                        {reasons[entId] ?
                            <>
                                {reasons[entId].length > 1 &&
                                    <div className="SoulItemPage__form__item__plusMinus__minus" onClick={() => {
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
}

export default SoulItemTextReason;