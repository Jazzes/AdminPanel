import React, {FC, useEffect} from 'react';
import {Fimbo} from "../../../../models/Models";
import {useAppSelector} from "../../../../store/hooks/redux";

interface IFimboItemListenMp3 {
    fimbo: Fimbo
    closeWindow: () => void
}

const FimboItemListenMp3: FC<IFimboItemListenMp3> = ({fimbo, closeWindow}) => {

    const {host} = useAppSelector(state => state.hostReducer)

    let sounds: {size22: HTMLAudioElement[], size27: HTMLAudioElement[], size32: HTMLAudioElement[]} = {
        size22: [],
        size27: [],
        size32: []
    };

    useEffect(() => {
        fimbo.notes.size22.forEach((entity) => {
            sounds.size22[Number(entity.note)] = new Audio(host + `/files/cover/${fimbo.path}/` + entity.file_sound)
        })
        fimbo.notes.size27.forEach((entity) => {
            sounds.size27[Number(entity.note)] = new Audio(host + `/files/cover/${fimbo.path}/` + entity.file_sound)
        })
        fimbo.notes.size32.forEach((entity) => {
            sounds.size32[Number(entity.note)] = new Audio(host + `/files/cover/${fimbo.path}/` + entity.file_sound)
        })
    }, [host, fimbo])

    return (
        <div className="FimboItemPage__mp3__background" onClick={() => closeWindow()}>
            <div className="FimboItemPage__mp3__container" onClick={event => {
                event.stopPropagation()
            }}>
                {fimbo.notes.size22.map((note) =>
                    <div key={note.note} className="FimboItemPage__mp3__item">
                        <div className="FimboItemPage__mp3__name">22см нота {note.note}</div>
                        <div className="FimboItemPage__mp3__block"
                             onClick={() => {
                                 if (sounds.size22[Number(note.note)].paused) {
                                     sounds.size22[Number(note.note)].play().then();
                                 } else {
                                     sounds.size22[Number(note.note)].currentTime = 0;
                                 }
                             }}>{note.file_sound}
                            <svg className="FimboItemPage__mp3__play" width="15" height="18" viewBox="0 0 15 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                            </svg>
                        </div>
                    </div>
                )}
                <div style={{marginTop: 10}}></div>
                {fimbo.notes.size27.map((note) =>
                    <div key={note.note} className="FimboItemPage__mp3__item">
                        <div className="FimboItemPage__mp3__name">27см нота {note.note}</div>
                        <div className="FimboItemPage__mp3__block"
                             onClick={() => {
                                 if (sounds.size27[Number(note.note)].paused) {
                                     sounds.size27[Number(note.note)].play().then();
                                 } else {
                                     sounds.size27[Number(note.note)].currentTime = 0;
                                 }
                             }}>{note.file_sound}
                            <svg className="FimboItemPage__mp3__play" width="15" height="18" viewBox="0 0 15 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                            </svg>
                        </div>
                    </div>
                )}
                <div style={{marginTop: 10}}></div>
                {fimbo.notes.size32.map((note) =>
                    <div key={note.note} className="FimboItemPage__mp3__item">
                        <div className="FimboItemPage__mp3__name">32см нота {note.note}</div>
                        <div className="FimboItemPage__mp3__block"
                             onClick={() => {
                                 if (sounds.size32[Number(note.note)].paused) {
                                     sounds.size32[Number(note.note)].play().then();
                                 } else {
                                     sounds.size32[Number(note.note)].currentTime = 0;
                                 }
                             }}>{note.file_sound}
                            <svg className="FimboItemPage__mp3__play" width="15" height="18" viewBox="0 0 15 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#19AD4B"/>
                            </svg>
                        </div>
                    </div>
                )}

                <div className="FimboItemPage__mp3__cross" onClick={() => {
                    closeWindow()
                }}/>
            </div>
        </div>
    );
};

export default FimboItemListenMp3;