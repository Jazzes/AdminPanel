import React, {FC, memo} from 'react';
import "./Messages.scss"

interface IWarningMessage{
    message: string
}

const WarningMessage: FC<IWarningMessage> = memo(({message}) => {
    return (
        <div className="WarningMessage">
            {message}
        </div>
    );
})

export default WarningMessage;