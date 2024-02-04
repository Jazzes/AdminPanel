import React from 'react';
import "./Messages.scss"
import {useAppSelector} from "../../store/hooks/redux";
import SuccessMessage from "./SuccessMessage";
import WarningMessage from "./WarningMessage";
import ErrorMessage from "./ErrorMessage";

const MessagesBlock = () => {

    const {show: showSuccess} = useAppSelector(state => state.successMessageReducer)
    const {show: showWarning, message: messageWarning} = useAppSelector(state => state.warningMessageReducer)
    const {show: showError} = useAppSelector(state => state.errorMessageReducer)

    return (
        <>
            {showSuccess&&
                <SuccessMessage/>
            }
            {showWarning&&
                <WarningMessage message={messageWarning}/>
            }
            {showError&&
                <ErrorMessage/>
            }
        </>
    );
};

export default MessagesBlock;