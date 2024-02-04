import React, {FC} from 'react';

interface IAreYouSureSave{
    rejectModal: () => void
}

const AreYouSureSave : FC<IAreYouSureSave> = ({rejectModal}) => {
    return (
        <div className="AreYouSure__background" onClick={rejectModal}>
            <div className="AreYouSure__window">
                <div className="AreYouSure__question">Вы точно хотите внести изменения?</div>
                <div className="AreYouSure__position">
                    <button type="submit" onClick={event => {
                        event.stopPropagation()
                        setTimeout(() => {rejectModal()})
                    }} className="AreYouSure__confirm">
                        Да
                    </button>
                    <div className="AreYouSure__reject" onClick={rejectModal}>
                        Нет
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreYouSureSave;