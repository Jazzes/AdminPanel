import React, {FC, useEffect, useState} from 'react';
import {Audio} from "../../../../models/Models";
import {useAppSelector} from "../../../../store/hooks/redux";
import {FimboApi} from "../../../../store/services/FimboApiService";
import "./AudioItemListenMp3.scss"

const AudioItemListenMp3: FC<{ audio: Audio }> = ({audio}) => {

    const {host} = useAppSelector(state => state.hostReducer)

    const {data: fimbo} = FimboApi.useFetchFimboQuery(String(audio.fimbo_id))


    const [audioPath, setAudioPath] = useState('')

    useEffect(() => {
        if (fimbo) {
            setAudioPath(`${host}/files/audio/${fimbo.path}/${audio.fimbo_size}/${audio.type}/${audio.path}/${audio.mp3_path}`)
        }
    }, [fimbo]);


    return (
        <div className="AudioItemPage__form__item">
            <div className="AudioItemPage__form__item_text" style={{overflowWrap: "break-word"}}>{audio.mp3_path}</div>
            <audio id="audio" src={audioPath} onTimeUpdate={(e) => {
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
            }}
                   onLoadedData={(e) => {
                       const {duration} = e.currentTarget
                       const min = Math.floor(duration / 60)
                       const sec = Math.floor(duration % 60)
                       document.getElementById(`commonTime`)!.innerHTML = `${min}:${sec < 10 ? `0${sec}` : sec}`
                   }}/>
            <div className="AudioItemPage__mp3__player">
                <div id={"playOrStop"} className="AudioItemPage__mp3__player__play"
                     onClick={async (e) => {
                         const a = document.getElementById(`audio`) as HTMLAudioElement
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
                    const audio: HTMLAudioElement = document.getElementById(`audio`) as HTMLAudioElement
                    const {duration} = audio
                    if (duration) {
                        audio.currentTime = (clickX / width) * duration
                    }
                }} className="AudioItemPage__mp3__slider__container">
                    <div className="AudioItemPage__mp3__slider__progress">
                        <div className="AudioItemPage__mp3__slider__progress_current"
                             id="progress"></div>
                    </div>
                </div>
                <div className="AudioItemPage__mp3__duration">
                    <div className="AudioItemPage__mp3__duration_current"
                         id="currentTime">0:00
                    </div>
                    /
                    <div className="AudioItemPage__mp3__duration_common"
                         id="commonTime">0:00</div>
                </div>
            </div>
        </div>
    );
};

export default AudioItemListenMp3;