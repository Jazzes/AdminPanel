import React, {FC} from 'react';
import "./AreYouSure.scss"
import {IAreYouSure} from "./AreYouSureBack";

const AreYouSureDelete : FC<IAreYouSure> = ({rejectModal, confirmModal}) => {
    return (
        <div className="AreYouSure__background" onClick={rejectModal}>
            <div className="AreYouSure__window">
                <div className="AreYouSure__question">Вы точно хотите удалить?</div>
                <div className="AreYouSure__position">
                    <div className="AreYouSure__confirm" onClick={confirmModal}>
                        Да
                    </div>
                    <div className="AreYouSure__reject" onClick={rejectModal}>
                        Нет
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreYouSureDelete;