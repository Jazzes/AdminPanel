import React, {FC} from 'react';
import {IAudioAdd} from "../../AudioAddPage";
import AudioAddVisible from "./AudioAddVisible";
import AudioAddType from "./AudioAddType";
import AudioAddFimboSize from "./AudioAddFimboSize";

const AudioAddInfoRight: FC<IAudioAdd> = ({wasChanges}) => {
    return (
        <>
            <AudioAddVisible wasChanges={wasChanges}/>
            <AudioAddType wasChanges={wasChanges}/>
            <AudioAddFimboSize wasChanges={wasChanges} />
        </>
    );
};

export default AudioAddInfoRight;