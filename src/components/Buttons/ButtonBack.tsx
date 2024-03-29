import React, {FC, memo, useState} from 'react';
import "./ButtonBack.scss"
import {useNavigate} from "react-router-dom";
import AreYouSureBack from "../ModalWindow/AreYouSureBack";

interface IButtonBack{
    wasChanges: React.MutableRefObject<boolean>
}

const ButtonBack : FC<IButtonBack> = memo(({wasChanges}) => {
    const navigate = useNavigate()
    const [sure, setSure] = useState(false)

    const rejectModal = () => {
        setSure(false)
    }

    const confirmModal = () => {
        navigate(-1)
    }

    const backSubmit = () => {
        if (wasChanges.current){
            setSure(true)
        }
        else {
            navigate(-1)
        }
    }

    return (
        <>
            <div className="ButtonBack" onClick={backSubmit}>
                <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM21 7L1 7L1 9L21 9L21 7Z"
                          fill="black"/>
                </svg>
            </div>

            {sure &&
                <AreYouSureBack confirmModal={confirmModal} rejectModal={rejectModal} />
            }

        </>

    );
})

export default ButtonBack;