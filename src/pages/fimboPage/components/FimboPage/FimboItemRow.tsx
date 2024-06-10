import React, {FC, memo} from 'react';
import "./FimboItemRow.scss"
import {Fimbo} from "../../../../models/Models";
import {Link} from "react-router-dom";
import FimboPagePreviews from "./FimboPagePreviews";

interface IFimboItemRow {
    fimbo: Fimbo
    index: number
    filesHost: string
}

const FimboItemRow: FC<IFimboItemRow> = memo(({fimbo, index, filesHost}) => {

    return (
        <>
            <div className={index % 2 === 1 ? "FimboItemRow__row" : "FimboItemRow__row FimboItemRow__row__color"}>

                <div className="FimboItemRow__row__id">
                    {fimbo.id}
                </div>

                <div className="FimboItemRow__row__pos">
                    {fimbo.position}
                </div>

                <div className="FimboItemRow__row__priority">
                    {fimbo.priority}
                </div>

                <div className="FimboItemRow__row__name">
                    {fimbo.name}
                </div>

                <div className="FimboItemRow__row__purchase">
                    {fimbo.purchase ?
                        <>Да</>
                        :
                        <>Нет</>
                    }
                </div>

                <FimboPagePreviews fimbo={fimbo} filesHost={filesHost}/>

                <div className="FimboItemRow__row__path">
                    {fimbo.path}
                </div>

                <div className="FimboItemRow__row__edit">
                    <Link to={'/fimbo/' + fimbo.id}>
                        <svg className="FimboItemRow__row__edit__pen" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 50 50" width="20"
                             height="20">
                            <path
                                d="M46.575,3.426C45.624,2.475,44.378,2,43.133,2c-1.246,0-2.492,0.476-3.443,1.426c0,0-0.067,0.067-0.159,0.159c-0.009,0.008-0.021,0.011-0.029,0.02L4.302,38.804c-0.124,0.124-0.213,0.278-0.259,0.448l-2.009,7.489c-0.093,0.345,0.006,0.713,0.259,0.966C2.483,47.897,2.738,48,3,48c0.086,0,0.173-0.011,0.259-0.034l7.489-2.01c0.169-0.046,0.324-0.135,0.448-0.259l35.199-35.198c0.011-0.011,0.014-0.025,0.024-0.037c0.089-0.089,0.153-0.153,0.153-0.153C48.475,8.408,48.475,5.326,46.575,3.426z M45.16,4.84c1.118,1.118,1.117,2.937-0.001,4.055c-0.329,0.329-0.612,0.611-0.854,0.854L40.25,5.694c0.459-0.459,0.854-0.854,0.854-0.854C41.646,4.298,42.366,4,43.133,4C43.898,4,44.619,4.299,45.16,4.84z M5.604,41.154l3.242,3.241l-4.431,1.189L5.604,41.154z"/>
                        </svg>
                    </Link>
                </div>

            </div>
        </>
    );
})

export default FimboItemRow;