import React, {FC, useEffect, useRef, useState} from 'react';
import {BeatEntity} from "../../../../models/Models";
import {ILessonAdd} from "./LessonAddInfo";

interface ILessonAddNoteTable extends ILessonAdd{
    l_beat: string
    l_tact: string
    l_square: string
    setL_square: React.Dispatch<React.SetStateAction<string>>
}

const LessonAddNoteTable: FC<ILessonAddNoteTable> = ({wasChanges, setL_square, l_tact, l_beat, l_square}) => {

    const [accents, setAccents] = useState<boolean[]>([])
    const [deleteString, setDeleteString] = useState<boolean[]>([])
    const [beatsVisible, setBeatsVisible] = useState<BeatEntity[]>([])
    const beatsNoUpdate = useRef<BeatEntity[]>([])
    const [updateBeats, setUpdateBeats] = useState(false)

    const addAccent = (index: number) => {
        let ab = [...accents]
        ab[index] = true
        setAccents(ab)
    }

    const deleteAccent = (index: number) => {
        let ab = [...accents]
        ab[index] = false
        setAccents(ab)
    }

    const changeBeats = (index: number, entity : BeatEntity) => {
        beatsNoUpdate.current[index] = entity
    }

    const changeDeleteString = (index: number) => {
        let p = [...deleteString]
        p[index] = !p[index]
        setDeleteString(p)
    }

    const deleteStringFromNote = (index: number) => {
        let ab = [...accents]
        ab.splice(index - Number(l_beat), Number(l_beat))
        setAccents(ab)

        beatsNoUpdate.current.splice(index - Number(l_beat), Number(l_beat))
        setBeatsVisible( [])
        setUpdateBeats(prevState => !prevState)
        setL_square( String(Number(l_square) - 1))
        wasChanges.current = true

    }

    const addStringFromNote = (index: number) => {
        const l_squareNew = Number(l_square)
        if (l_squareNew < 100) {
            setL_square(String(l_squareNew + 1))
            wasChanges.current = true

            let j: boolean[] = []
            const before = Number(l_beat)
            for (let i = 0; i < before; ++i) {
                j.push(false)
            }
            let ab = [...accents]
            ab.splice(index, 0, ...j)
            setAccents(ab)

            let c: BeatEntity[] = []
            for (let i = 0; i < Number(l_beat); ++i) {
                c.push({num: null, num_l: null, num_r: null, accent: false})
            }
            beatsNoUpdate.current.splice(index, 0, ...c)
            setBeatsVisible( [])
            setUpdateBeats(prevState => !prevState)
        }
    }

    useEffect(() => {
        setBeatsVisible([...beatsNoUpdate.current])
    }, [updateBeats]);


    useEffect(() => {
        let checks = Number(l_square) * Number(l_beat) - beatsNoUpdate.current.length
        const before = Number(l_square) * Number(l_beat)
        if (checks < 1){
            checks = 0
        }
        let p: BeatEntity[] = []
        for (let i = 0; i < checks; ++i) {
            beatsNoUpdate.current.push({num: null, num_l: null, num_r: null, accent: false})
        }
        for (let i = 0; i < before; ++i) {
            p[i] = beatsNoUpdate.current[i]
        }
        setBeatsVisible(p)
    }, [l_square, l_beat])

    return (
        <div className="LessonAddPage__form__notes__container">
            <div className="LessonAddPage__form__notes__hint">Даблклик по клетке ставит акцент</div>
            <div style={{maxWidth: `${Number(l_beat) * 20}px`, minWidth: `${Number(l_beat) * 20}px`}}
                 className="LessonAddPage__form__notes__table">
                {beatsVisible.map((entity, index) =>
                    <div key={index + "ASC"}>
                        {(index + 1) % Number(l_beat) === 0 ?
                            <div key={index + "la"}>
                                <div className="LessonAddPage__form__notes__table__hint" key={index + "laa"}
                                     style={{top: `${(index + 1) / Number(l_beat) * 62 - 31}px`}}>A
                                </div>
                                <div className="LessonAddPage__form__notes__table__hint" key={index + "lab"}
                                     style={{top: `${(index + 1) / Number(l_beat) * 62 - 11}px`}}>L
                                </div>
                                <div className="LessonAddPage__form__notes__table__hint" key={index + "lac"}
                                     style={{top: `${(index + 1) / Number(l_beat) * 62 + 9}px`}}>R
                                </div>
                                <div className="LessonAddPage__form__notes__table__numberString" key={index + "lag"}
                                     style={{top: `${(index + 1) / Number(l_beat) * 62 - 18}px`}}>
                                    <div className="LessonAddPage__form__notes__table__numberString__settings">
                                        <div className="LessonAddPage__form__notes__table__numberString__settings__item"
                                             onClick={() => {
                                                 addStringFromNote((index + 1) - Number(l_beat))
                                             }}>Строчка до
                                        </div>
                                        <div onClick={() => {
                                            addStringFromNote((index + 1))
                                        }}
                                             className="LessonAddPage__form__notes__table__numberString__settings__item_center">Строчка
                                            после
                                        </div>
                                        <div className="LessonAddPage__form__notes__table__numberString__settings__item"
                                             onClick={() => {
                                                 changeDeleteString((index + 1) / Number(l_beat) - 1)
                                             }}>
                                            {!deleteString[(index + 1) / Number(l_beat) - 1] ?
                                                <>Удалить</>
                                                :
                                                <div className="LessonAddPage__form__notes__table__numberString__settings__item__delete">
                                                    <div className="LessonAddPage__form__notes__table__numberString__settings__item__delete_yes"
                                                         onClick={() => {
                                                             deleteStringFromNote(index + 1)
                                                         }}>Да
                                                    </div>
                                                    <div className="LessonAddPage__form__notes__table__numberString__settings__item__delete_no">Нет</div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                    <div>{(index + 1) / Number(l_beat)}</div>
                                </div>
                            </div>
                            : <></>}

                        <div key={index}
                             style={(index + 1) % (Number(l_beat) * Number(l_square) + 1) <= Number(l_beat) * (Number(l_square) - 1) ? {borderBottom: "2px solid orange"} : {}}
                             className="LessonAddPage__form__notes__table__note">
                            <input style={{display: "none"}} onChange={() => {}} name={"accent" + index}
                                   value={accents[index] ? 1 : 0} type="number"/>
                            <input
                                style={(index + 1) % Number(l_tact) === 0 && (index + 1) % Number(l_beat) !== 0 ? {borderRight: "1px solid gray"} : (index + 1) % Number(l_beat) === 0 ? {borderRight: "0"} : {}}
                                key={index + "n"} name={"num" + index}
                                onChange={(e) => {
                                    wasChanges.current = true
                                    changeBeats(index, {
                                        ...beatsNoUpdate.current[index],
                                        num: e.target.value === "" ? null : Number(e.target.value)
                                    })
                                }}
                                onDoubleClick={() => {
                                    wasChanges.current = true
                                    if (accents[index]) {
                                        deleteAccent(index)
                                    } else {
                                        addAccent(index)
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "ArrowUp") {
                                        document.getElementById(index - Number(l_beat) + 1 > 0 ? `num_r${index - Number(l_beat)}` : `num_r${Number(l_beat) * (Number(l_square) - 1) + index}`)!.focus()
                                    } else if (e.key === "ArrowDown") {
                                        document.getElementById(`num_l${index}`)!.focus()
                                    } else if (e.key === "ArrowRight") {
                                        document.getElementById(index + 1 < beatsVisible.length ? `num${index + 1}` : `num0`)!.focus()
                                    } else if (e.key === "ArrowLeft") {
                                        document.getElementById(index > 0 ? `num${index - 1}` : `num${beatsVisible.length - 1}`)!.focus()
                                    }
                                }}
                                id={"num" + index}
                                defaultValue={entity.num || entity.num === 0 ? entity.num : ""}
                                title="num" pattern="[0-9]?"
                                autoComplete={"off"}
                                className={accents[index] ? "LessonAddPage__form__notes__table__input LessonAddPage__form__notes__table__input_orange" : "LessonAddPage__form__notes__table__input"}/>
                            <input
                                style={(index + 1) % Number(l_tact) === 0 && (index + 1) % Number(l_beat) !== 0 ? {borderRight: "1px solid gray"} : (index + 1) % Number(l_beat) === 0 ? {borderRight: "0"} : {}}
                                key={index + "l"} name={"num_l" + index}
                                onChange={(e) => {
                                    wasChanges.current = true
                                    changeBeats(index, {
                                        ...beatsNoUpdate.current[index],
                                        num_l: e.target.value === "" ? null : Number(e.target.value)
                                    })
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "ArrowUp") {
                                        document.getElementById(`num${index}`)!.focus()
                                    } else if (e.key === "ArrowDown") {
                                        document.getElementById(`num_r${index}`)!.focus()
                                    } else if (e.key === "ArrowRight") {
                                        document.getElementById(index + 1 < beatsVisible.length ? `num_l${index + 1}` : `num_l0`)!.focus()
                                    } else if (e.key === "ArrowLeft") {
                                        document.getElementById(index > 0 ? `num_l${index - 1}` : `num_l${beatsVisible.length - 1}`)!.focus()
                                    }
                                }}
                                id={"num_l" + index}
                                defaultValue={entity.num_l || entity.num_l === 0 ? entity.num_l : ""}
                                title="num_l" pattern="[0-9]?"
                                autoComplete={"off"}
                                className="LessonAddPage__form__notes__table__input_center"/>
                            <input
                                style={(index + 1) % Number(l_tact) === 0 && (index + 1) % Number(l_beat) !== 0 ? {borderRight: "1px solid gray"} : (index + 1) % Number(l_beat) === 0 ? {borderRight: "0"} : {}}
                                key={index + "r"} name={"num_r" + index}
                                onChange={(e) => {
                                    wasChanges.current = true
                                    changeBeats(index, {
                                        ...beatsNoUpdate.current[index],
                                        num_r: e.target.value === "" ? null : Number(e.target.value)
                                    })
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "ArrowUp") {
                                        document.getElementById(`num_l${index}`)!.focus()
                                    } else if (e.key === "ArrowDown") {
                                        document.getElementById(index + Number(l_beat) < Number(l_beat) * Number(l_square) ? `num${index + Number(l_beat)}` : `num${index - Number(l_beat) * (Number(l_square) - 1)}`)!.focus()
                                    } else if (e.key === "ArrowRight") {
                                        document.getElementById(index + 1 < beatsVisible.length ? `num_r${index + 1}` : `num_r0`)!.focus()
                                    } else if (e.key === "ArrowLeft") {
                                        document.getElementById(index > 0 ? `num_r${index - 1}` : `num_r${beatsVisible.length - 1}`)!.focus()
                                    }
                                }}
                                id={"num_r" + index}
                                defaultValue={entity.num_r || entity.num_r === 0 ? entity.num_r : ""}
                                title="num_r" pattern="[0-9]?"
                                autoComplete={"off"}
                                className="LessonAddPage__form__notes__table__input"/>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LessonAddNoteTable;