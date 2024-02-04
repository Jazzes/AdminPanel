import React, {FC, useState} from 'react';
import {FimboItem} from "../../FimboItemPage";
import "./FimboItemListenMp3.scss"
import FimboItemListenMp3 from "./FimboItemListenMp3";

const FimboItemListenMp3Button : FC<FimboItem> = ({fimbo}) => {
    const [showMp3, setShowMp3] = useState(false)

    const closeWindow = () => setShowMp3(false)

    return (
        <>
            <div className="FimboItemPage__listen_button" onClick={() => setShowMp3(true)}>Слушать</div>
            {showMp3 &&
                <FimboItemListenMp3 closeWindow={closeWindow} fimbo={fimbo} />
            }
        </>
    );
};

export default FimboItemListenMp3Button;