import React, {FC, useEffect, useRef, useState} from 'react';
import {BeatEntity} from "../../../../models/Models";
import FetchLoading from "../../../../components/Loading/FetchLoading";
import "./LessonItemPlayNotes.scss"
import {ILessonOneResponse} from "../../../../models/StoreModels";
import {Notes} from "./Notes";
import {FimboApi} from "../../../../store/services/FimboApiService";
import {useAppSelector} from "../../../../store/hooks/redux";

interface ILessonItemListen {
    beats: React.MutableRefObject<BeatEntity[]>
    l_beat: string
    l_tact: string
    l_square: string
    bpm: string
    closeWindow: () => void
    lesson: ILessonOneResponse
}

const LessonItemPlayNotes: FC<ILessonItemListen> = ({bpm, lesson, closeWindow, beats, l_beat, l_square, l_tact}) => {

    const {data: fimbos, isLoading: fimboLoading} = FimboApi.useFetchAllFimbosQuery('')

    const l_squareNum = Number(l_square)
    const bpmNum = Number(bpm)
    const l_tactNum = Number(l_tact)
    const l_beatNum = Number(l_beat)

    const fimboSelected = useRef(lesson.fimbos.length > 0 ? lesson.fimbos[0].id : 0)
    const [play, setPlay] = useState(false)
    const Interval = useRef<NodeJS.Timer>()
    const currentNotePlaying = useRef(0)
    const BPM = 1 / (bpmNum / 60) * 1000
    const CommonCount = l_squareNum * l_beatNum

    const [updateNotes, setUpdateNotes] = useState(false)

    const notesPlay = useRef<Notes>()
    const {host} = useAppSelector(state => state.hostReducer)

    const initTact = localStorage.getItem("turnOnTact") === "true"
    const [turnTact, setTurnTact] = useState(initTact)
    const initSound = localStorage.getItem("turnOffSound") !== "false"
    const [soundNote, setSoundNote] = useState(initSound)

    useEffect(() => {
        currentNotePlaying.current = 0
        clearInterval(Interval.current)
        for (let i = 0; i < CommonCount; ++i) {
            clearNote(i)
        }
        if (fimbos) {
            fimbos.rows.forEach(ent => {
                if (ent.id === fimboSelected.current) {
                    notesPlay.current = new Notes(
                        {
                            path: ent.path,
                            host,
                            names: ent.notes,
                            lessonPath: lesson.lesson.path
                        }
                    )
                }
            })
        }
    }, [updateNotes]);

    useEffect(() => {
        if (play) {
            startInterval()
        } else {
            clearInterval(Interval.current)
        }
    }, [play])

    useEffect(() => {
        if (turnTact) {
            localStorage.setItem("turnOnTact", "true")
        } else {
            localStorage.setItem("turnOnTact", "false")
        }
    }, [turnTact]);

    useEffect(() => {
        if (soundNote) {
            localStorage.setItem("turnOffSound", "true")
        } else {
            localStorage.setItem("turnOffSound", "false")
        }
    }, [soundNote]);

    const startInterval = () => {
        if (soundNote) {
            PlayNote(beats.current[currentNotePlaying.current])
        }
        if (turnTact) {
            PlayTactSquare()
        }
        animNote(currentNotePlaying.current)
        Interval.current = setInterval(() => {
            playedNote(currentNotePlaying.current)
            currentNotePlaying.current += 1
            if (currentNotePlaying.current >= CommonCount) {
                animNote(currentNotePlaying.current - 1)
                currentNotePlaying.current = 0
                for (let i = 0; i < CommonCount; ++i) {
                    clearNote(i)
                }
                setPlay(false)
            } else {
                animNote(currentNotePlaying.current)
                if (soundNote) {
                    PlayNote(beats.current[currentNotePlaying.current])
                }
                if (turnTact) {
                    PlayTactSquare()
                }
            }

        }, BPM)
    }

    const PlayTactSquare = () => {
        if (currentNotePlaying.current % l_beatNum === 0) {
            notesPlay.current!.startSamp(12)
        } else if ((currentNotePlaying.current) % l_tactNum === 0) {
            notesPlay.current!.startSamp(11)
        }
    }

    const PlayNote = (BeatArr: BeatEntity) => {
        let num = BeatArr.num
        let num_l = BeatArr.num_l
        let num_r = BeatArr.num_r
        if (num === 0)
            num = 10
        if (num_l === 0)
            num_l = 10
        if (num_r === 0)
            num_r = 10
        if (num_l && num_r) {
            notesPlay.current!.startSamp(num_l)
            notesPlay.current!.startSamp(num_r)
        } else if (num_l && num) {
            notesPlay.current!.startSamp(num_l)
            notesPlay.current!.startSamp(num)
        } else if (num || num_l || num_r) {
            let pepe: number = 0
            if (num) {
                pepe = num
            }
            if (num_l) {
                pepe = num_l
            }
            if (num_r) {
                pepe = num_r
            }
            notesPlay.current!.startSamp(pepe, !!BeatArr.accent)
        }
    }

    const animNote = (id: number) => {
        document.querySelector(`#num_${id}`)?.classList.add("LessonItemPage__notesListen__notes__animate")
    }

    const clearNote = (id: number) => {
        document.querySelector(`#num_${id}`)?.classList.remove("LessonItemPage__notesListen__notes__animate")
        document.querySelector(`#num_${id}`)?.classList.remove("LessonItemPage__notesListen__notes__played")
    }

    const playedNote = (id: number) => {
        document.querySelector(`#num_${id}`)?.classList.remove("LessonItemPage__notesListen__notes__animate")
        document.querySelector(`#num_${id}`)?.classList.add("LessonItemPage__notesListen__notes__played")
    }

    return (
        <>
            {(fimboLoading) ?
                <FetchLoading/>
                :
                <div className="LessonItemPage__notesListen__background" onClick={() => {
                    clearInterval(Interval.current)
                    closeWindow()
                }}>
                    <div className="LessonItemPage__notesListen__container" onClick={e => e.stopPropagation()}>

                        <div className="LessonItemPage__notesListen__cross" onClick={() => {
                            clearInterval(Interval.current)
                            closeWindow()
                        }}/>

                        <div className="LessonItemPage__notesListen__fimbo">
                            Фимбо
                            <label>
                                <select className="LessonItemPage__notesListen__fimbo__select"
                                        onChange={(e) => {
                                            fimboSelected.current = Number(e.target.value)
                                            setUpdateNotes(prevState => !prevState)
                                            setPlay(false)
                                        }} defaultValue={String(fimboSelected)}>
                                    {lesson.fimbos.map((ent) =>
                                        <option key={ent.id} value={ent.id}>{ent.name}</option>
                                    )}
                                </select>
                            </label>
                        </div>


                        <div className="LessonItemPage__notesListen__notes__container">
                            <div style={{
                                maxWidth: `${l_beatNum * 20 + 15}px`,
                                minWidth: `${l_beatNum * 20 + 15}px`
                            }} className="LessonItemPage__notesListen__notes__rows">
                                {beats.current.map((entity, index) =>
                                    <div key={index} className="LessonItemPage__notesListen__notes__column">
                                        {(((entity.num_r || entity.num_r === 0) && (entity.num_l || entity.num_l === 0)) || ((entity.num_l || entity.num_l === 0) && (entity.num || entity.num === 0))) ?
                                            <div id={"num_" + index} onClick={() => {
                                                currentNotePlaying.current = index
                                                for (let i = 0; i < currentNotePlaying.current; ++i) {
                                                    playedNote(i)
                                                }
                                                for (let i = currentNotePlaying.current; i < CommonCount; ++i) {
                                                    clearNote(i)
                                                }
                                                if (play) {
                                                    clearInterval(Interval.current)
                                                    startInterval()
                                                }

                                            }}
                                                 className={(index + 1) % l_beatNum === 0 ? "LessonItemPage__notesListen__note LessonItemPage__notesListen__note_noRight" : "LessonItemPage__notesListen__note"}
                                                 style={index >= (l_beatNum * (l_squareNum - 1)) ? {borderBottom: 0} : {}}>
                                                <div className="LessonItemPage__notesListen__note_top">
                                                    {entity.num_l}
                                                </div>
                                                <div className="LessonItemPage__notesListen__note_bot">
                                                    {(entity.num_r || entity.num_r === 0) ?
                                                        <>
                                                            {entity.num_r}
                                                        </>
                                                        :
                                                        <>
                                                            {entity.num}
                                                        </>
                                                    }
                                                </div>

                                            </div>
                                            :
                                            <div id={"num_" + index} onClick={() => {
                                                currentNotePlaying.current = index
                                                for (let i = 0; i < currentNotePlaying.current; ++i) {
                                                    playedNote(i)
                                                }
                                                for (let i = currentNotePlaying.current; i < CommonCount; ++i) {
                                                    clearNote(i)
                                                }
                                                if (play) {
                                                    clearInterval(Interval.current)
                                                    startInterval()
                                                }
                                            }}
                                                 className={(index + 1) % l_beatNum === 0 ? "LessonItemPage__notesListen__note LessonItemPage__notesListen__note_noRight" : "LessonItemPage__notesListen__note"}
                                                 style={index >= (l_beatNum * (l_squareNum - 1)) ? {borderBottom: 0} : {}}>
                                                {(entity.num || entity.num === 0) &&
                                                    <>{entity.num}</>
                                                }
                                                {(entity.num_l || entity.num_l === 0) &&
                                                    <>{entity.num_l}</>
                                                }
                                                {(entity.num_r || entity.num_r === 0) &&
                                                    <>{entity.num_r}</>
                                                }
                                            </div>
                                        }

                                    </div>
                                )}
                            </div>
                        </div>


                        <div
                            className={play ? "LessonItemPage__notesListen__mode_play LessonItemPage__notesListen__mode_pause" : " LessonItemPage__notesListen__mode_play"}
                            onClick={() => {
                                setPlay(!play)
                            }}>
                            {play ?
                                <>Pause</>
                                :
                                <>Play</>
                            }
                        </div>

                        <div className="LessonItemPage__notesListen__sound">
                            Звук нот
                            <div
                                className={soundNote ? "LessonItemPage__notesListen__circle LessonItemPage__notesListen__circle__filled" : "LessonItemPage__notesListen__circle"}
                                onClick={() => {
                                    setSoundNote(prev => !prev)
                                }}/>
                        </div>

                        <div className="LessonItemPage__notesListen__tact">
                            Такт
                            <div
                                className={turnTact ? "LessonItemPage__notesListen__circle LessonItemPage__notesListen__circle__filled" : "LessonItemPage__notesListen__circle"}
                                onClick={() => {
                                    setTurnTact(prev => !prev)
                                }}/>
                        </div>

                    </div>
                </div>

            }

        </>

    );
};

export default LessonItemPlayNotes;