import React, {FC} from 'react';
import {AudioItemWithChange} from "../../AudioItemPage";
import AudioItemVisible from "./AudioItemVisible";
import AudioItemType from "./AudioItemType";
import AudioItemFimboSize from "./AudioItemFimboSize";

const AudioItemInfoRight : FC<AudioItemWithChange>= ({audio, wasChanges}) => {
    return (
        <>
            <AudioItemVisible audio={audio} wasChanges={wasChanges}/>
            <AudioItemType audio={audio} wasChanges={wasChanges}/>
            <AudioItemFimboSize audio={audio} wasChanges={wasChanges} />
        </>
    );
};

export default AudioItemInfoRight;