import React, {FC, useEffect, useRef, useState} from 'react';
import {ILessonOneResponse} from "../../../../models/StoreModels";
import {useAppSelector} from "../../../../store/hooks/redux";
import "./LessonItemListenMp3.scss"
import {LessonTypeApi} from "../../../../store/services/LessonTypeApiService";

interface ILessonItemListenMp3 {
    lesson: ILessonOneResponse
    closeWindow: () => void
}

const LessonItemListenMp3: FC<ILessonItemListenMp3> = ({lesson, closeWindow}) => {

    const {data: lessonTypes} = LessonTypeApi.useFetchAllLessonTypesQuery('')
    const {host} = useAppSelector(state => state.hostReducer)

    const pathOfLesson = (id: number) => {
        if (lessonTypes) {
            for (let i = 0; i < lessonTypes.rows.length; ++i) {
                if (id === lessonTypes.rows[i].id) {
                    return lessonTypes.rows[i].path
                }
            }
        }
    }

    const pathLesson = useRef(pathOfLesson(lesson.lesson.lesson_type_id)!)
    const [sounds, setSounds] = useState<string[]>([])
    const [soundTactSq, setSoundTactSq] = useState<HTMLAudioElement[]>([])

    useEffect(() => {
        let a: string[] = []
        if (pathLesson.current === "cover") {
            lesson.fimbos.forEach(entity => {
                a[Number(entity.id)] = host + `/files/${pathLesson.current}/${entity.path}/${lesson.lesson.path}/` + lesson.lesson.mp3.mp3_fimbo
            })
            setSounds(a)
            setSoundTactSq([
                new Audio(host + `/files/${pathLesson.current}/${lesson.fimbos.length ? lesson.fimbos[0].path : ""}/${lesson.lesson.path}/` + lesson.lesson.mp3.mp3_tact),
                new Audio(host + `/files/${pathLesson.current}/${lesson.fimbos.length ? lesson.fimbos[0].path : ""}/${lesson.lesson.path}/` + lesson.lesson.mp3.mp3_square)
            ])
        } else {
            a[0] = host + `/files/${pathLesson.current}/${lesson.lesson.path}/` + lesson.lesson.mp3.mp3_fimbo
            setSounds(a)
            setSoundTactSq([
                new Audio(host + `/files/${pathLesson.current}/${lesson.lesson.path}/` + lesson.lesson.mp3.mp3_tact),
                new Audio(host + `/files/${pathLesson.current}/${lesson.lesson.path}/` + lesson.lesson.mp3.mp3_square)
            ])
        }
    }, [lesson])

    return (
        <>
            <div className="LessonItemPage__mp3__background" onClick={() => closeWindow()}>
                <div className="LessonItemPage__mp3__container" onClick={(e) => e.stopPropagation()}>
                    <div className="LessonItemPage__mp3__cross" onClick={() => closeWindow()}/>

                    {pathLesson.current === "cover" ? lesson.fimbos.map((entity) =>
                            <div key={entity.id} className="LessonItemPage__mp3__item">
                                <div className="LessonItemPage__mp3__name">mp3_fimbo {entity.path}</div>
                                <div>
                                    {lesson.lesson.mp3.mp3_fimbo.slice(0, -4) + "_" + entity.path + ".mp3"}
                                    <audio id={"audio" + entity.id}
                                           src={sounds[entity.id]} onTimeUpdate={(e) => {
                                        const {currentTime, duration} = e.currentTarget
                                        const progress = (currentTime / duration) * 100
                                        const min = Math.floor(currentTime / 60)
                                        const sec = Math.floor(currentTime % 60)
                                        document.getElementById(`currentTime${entity.id}`)!.innerHTML = `${min}:${sec < 10 ? `0${sec}` : sec}`
                                        document.getElementById(`progress${entity.id}`)!.style.width = `${progress}%`
                                        if (currentTime === duration) {
                                            e.currentTarget.currentTime = 0
                                            e.currentTarget.play().then()
                                        }
                                    }}
                                           onLoadedData={(e) => {
                                               const {duration} = e.currentTarget
                                               const min = Math.floor(duration / 60)
                                               const sec = Math.floor(duration % 60)
                                               document.getElementById(`commonTime${entity.id}`)!.innerHTML = `${min}:${sec < 10 ? `0${sec}` : sec}`
                                           }}/>
                                    <div className="LessonItemPage__mp3__player">
                                        <div id={"playOrStop" + entity.id} className="LessonItemPage__mp3__player__play"
                                             onClick={async (e) => {
                                                 lesson.fimbos?.forEach((sam) => {
                                                     if (entity.id !== sam.id) {
                                                         document.getElementById(`playOrStop${sam.id}`)!.innerHTML = `
                                                    <svg class="PlayNumber" width="15" height="18" viewBox="0 0 15 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                                                    </svg>
                                                    `
                                                         let a = document.getElementById(`audio${sam.id}`) as HTMLAudioElement
                                                         if (!a.paused)
                                                             a.pause()
                                                     }
                                                 })

                                                 const a = document.getElementById(`audio${entity.id}`) as HTMLAudioElement
                                                 if (a.paused) {
                                                     e.currentTarget.innerHTML = `
                                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="5" height="18" fill="#19AD4B"/>
                                                        <rect x="9" width="5" height="18" fill="#19AD4B"/>
                                                    </svg>
                                                    `
                                                     await a.play()
                                                 } else {
                                                     e.currentTarget.innerHTML = `
                                                    <svg class="PlayNumber" width="15" height="18" viewBox="0 0 15 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                                                    </svg>
                                                    `
                                                     a.pause()
                                                 }
                                             }}>
                                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                                            </svg>
                                        </div>

                                        <div onClick={(e) => {
                                            const width = e.currentTarget.clientWidth
                                            const clickX = e.nativeEvent.offsetX
                                            const audio: HTMLAudioElement = document.getElementById(`audio${entity.id}`) as HTMLAudioElement
                                            const {duration} = audio
                                            if (duration) {
                                                audio.currentTime = (clickX / width) * duration
                                            }
                                        }} className="LessonItemPage__mp3__slider__container">
                                            <div className="LessonItemPage__mp3__slider__progress">
                                                <div className="LessonItemPage__mp3__slider__progress_current"
                                                     id={"progress" + entity.id}></div>
                                            </div>
                                        </div>
                                        <div className="LessonItemPage__mp3__duration">
                                            <div className="LessonItemPage__mp3__duration_current"
                                                 id={"currentTime" + entity.id}>0:00
                                            </div>
                                            /
                                            <div className="LessonItemPage__mp3__duration_common"
                                                 id={"commonTime" + entity.id}>0:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <div className="LessonItemPage__mp3__item">
                            <div className="LessonItemPage__mp3__name">mp3_fimbo</div>
                            <div>
                                {lesson.lesson.mp3.mp3_fimbo}
                                <audio id={"audio"}
                                       src={sounds[0]} onTimeUpdate={(e) => {
                                    const {currentTime, duration} = e.currentTarget
                                    const progress = (currentTime / duration) * 100
                                    const min = Math.floor(currentTime / 60)
                                    const sec = Math.floor(currentTime % 60)
                                    document.getElementById(`currentTime`)!.innerHTML = `${min}:${sec < 10 ? `0${sec}` : sec}`
                                    document.getElementById(`progress`)!.style.width = `${progress}%`
                                    if (currentTime === duration) {
                                        e.currentTarget.currentTime = 0
                                        e.currentTarget.play().then()
                                    }
                                }} onLoadedData={(e) => {
                                    const {duration} = e.currentTarget
                                    const min = Math.floor(duration / 60)
                                    const sec = Math.floor(duration % 60)
                                    document.getElementById(`commonTime`)!.innerHTML = `${min}:${sec < 10 ? `0${sec}` : sec}`
                                }}/>
                                <div className="LessonItemPage__mp3__player">
                                    <div id={"playOrStop"} className="LessonItemPage__mp3__player__play"
                                         onClick={async (e) => {
                                             let a = document.getElementById(`audio`) as HTMLAudioElement
                                             if (a.paused) {
                                                 e.currentTarget.innerHTML = `
                                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="5" height="18" fill="#19AD4B"/>
                                                        <rect x="9" width="5" height="18" fill="#19AD4B"/>
                                                    </svg>
                                                    `
                                                 await a.play()
                                             } else {
                                                 e.currentTarget.innerHTML = `
                                                    <svg class="LessonItemPage__mp3__play" width="15" height="18" viewBox="0 0 15 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                                                    </svg>
                                                    `
                                                 a.pause()
                                             }
                                         }}>
                                        <svg width="15" height="18" viewBox="0 0 15 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                                        </svg>
                                    </div>

                                    <div onClick={(e) => {
                                        const width = e.currentTarget.clientWidth
                                        const clickX = e.nativeEvent.offsetX
                                        const audio: HTMLAudioElement = document.getElementById(`audio`) as HTMLAudioElement
                                        const {duration} = audio
                                        if (duration) {
                                            audio.currentTime = (clickX / width) * duration
                                        }
                                    }} className="LessonItemPage__mp3__slider__container">
                                        <div className="LessonItemPage__mp3__slider__progress">
                                            <div className="LessonItemPage__mp3__slider__progress_current"
                                                 id={"progress"}></div>
                                        </div>
                                    </div>
                                    <div className="LessonItemPage__mp3__duration">
                                        <div className="LessonItemPage__mp3__duration_current" id={"currentTime"}>0:00
                                        </div>
                                        /
                                        <div className="LessonItemPage__mp3__duration_common"
                                             id={"commonTime"}>0:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div key="tact" className="LessonItemPage__mp3__item">
                        <div className="LessonItemPage__mp3__name">mp3_tact</div>
                        <div className="LessonItemPage__mp3__block"
                             onClick={() => {
                                 if (soundTactSq[0].paused) {
                                     soundTactSq[0].play().then();
                                 } else {
                                     soundTactSq[0].currentTime = 0;
                                 }
                             }}
                        >{lesson.lesson.mp3.mp3_tact}
                            <svg className="LessonItemPage__mp3__play" width="15" height="18" viewBox="0 0 15 18"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                            </svg>
                        </div>
                    </div>
                    <div key="square" className="LessonItemPage__mp3__item">
                        <div className="LessonItemPage__mp3__name">mp3_square</div>
                        <div className="LessonItemPage__mp3__block"
                             onClick={() => {
                                 if (soundTactSq[1].paused) {
                                     soundTactSq[1].play().then();
                                 } else {
                                     soundTactSq[1].currentTime = 0;
                                 }
                             }}>{lesson.lesson.mp3.mp3_square}
                            <svg className="LessonItemPage__mp3__play" width="15" height="18" viewBox="0 0 15 18"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                            </svg>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default LessonItemListenMp3;