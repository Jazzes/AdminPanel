import React, {FC} from 'react';
import "./AreYouSure.scss"

export interface IAreYouSure {
    rejectModal: () => void
    confirmModal: () => void
}

const AreYouSureBack: FC<IAreYouSure> = ({confirmModal, rejectModal}) => {
    return (
        <div className="AreYouSure__background" onClick={rejectModal}>
            <div className="AreYouSure__window">
                <div className="AreYouSure__question">Вы заполнили некоторые данные. Точно хотите закрыть окно?</div>
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

export default AreYouSureBack;