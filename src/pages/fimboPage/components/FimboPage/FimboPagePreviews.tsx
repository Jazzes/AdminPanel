import React, {FC, useRef, useState} from 'react';
import ImgPreview from "../../../../components/PhotoPreview/ImgPreview";
import {Fimbo} from "../../../../models/Models";

interface IFimboPagePreview {
    fimbo: Fimbo
    filesHost: string
}

const FimboPagePreviews: FC<IFimboPagePreview>  = ({fimbo, filesHost}) => {
    const noImg = useRef(false)
    const [imgPreview, setImgPreview] = useState(false)
    const imgURL = `${filesHost}/files/cover/${fimbo.path}/`
    const pathUrl = useRef('')

    const closeImgPreview = () => {
        setImgPreview(false)
    }

    return (
        <>
            <div className="FimboItemRow__row__preview">

                <img className="FimboItemRow__row__preview__photo"
                     src={imgURL + fimbo.img} onClick={() => {
                    if (!noImg.current) {
                        pathUrl.current = fimbo.img
                        setImgPreview(true)
                    }
                }} loading="lazy" alt=""/>

                <img className="FimboItemRow__row__preview__photo"
                     src={imgURL + fimbo.img_listen} onClick={() => {
                    if (!noImg.current) {
                        pathUrl.current = fimbo.img_listen
                        setImgPreview(true)
                    }
                }} loading="lazy" alt=""/>

                {fimbo.img_additional.map((ent, index) =>
                    <div key={index}>
                        {ent.path.length > 0 ?
                            <img className="FimboItemRow__row__preview__photo" key={index}
                                 src={imgURL + ent.path} onClick={() => {
                                if (!noImg.current) {
                                    pathUrl.current = ent.path
                                    setImgPreview(true)
                                }
                            }} loading="lazy" alt=""/>
                            :
                            <></>
                        }
                    </div>
                )}
            </div>

            {imgPreview &&
                <ImgPreview closeImgPreview={closeImgPreview} url={imgURL + pathUrl.current}/>
            }
        </>
    );
};

export default FimboPagePreviews;