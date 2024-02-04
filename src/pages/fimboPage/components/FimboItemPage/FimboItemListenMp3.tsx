import React, {FC, useEffect} from 'react';
import {Fimbo} from "../../../../models/Models";
import {useAppSelector} from "../../../../store/hooks/redux";

interface FimboItemListenMp3 {
    fimbo: Fimbo
    closeWindow: () => void
}

const FimboItemListenMp3: FC<FimboItemListenMp3> = ({fimbo, closeWindow}) => {

    const {host} = useAppSelector(state => state.hostReducer)

    let sounds: HTMLAudioElement[] = [];

    useEffect(() => {
        fimbo.notes.forEach((entity) => {
            sounds[Number(entity.note)] = new Audio(host + `/files/cover/${fimbo.path}/` + entity.file_sound)
        })
    }, [host, fimbo])

    return (
        <div className="FimboItemPage__mp3__background" onClick={() => closeWindow()}>
            <div className="FimboItemPage__mp3__container" onClick={event => {
                event.stopPropagation()
            }}>
                {fimbo.notes.map((note) =>
                    <div key={note.note} className="FimboItemPage__mp3__item">
                        <div className="FimboItemPage__mp3__name">Нота {note.note}</div>
                        <div className="FimboItemPage__mp3__block"
                             onClick={() => {
                                 if (sounds[Number(note.note)].paused) {
                                     sounds[Number(note.note)].play().then();
                                 } else {
                                     sounds[Number(note.note)].currentTime = 0;
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