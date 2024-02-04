import React, {FC} from 'react';
import "./ImgPreview.scss"

interface IImgPreview{
    closeImgPreview: () => void
    url: string
}

const ImgPreview : FC<IImgPreview> = ({closeImgPreview, url}) => {
    return (
        <div className="ImgPreview__container" onClick={closeImgPreview}>
            <div className="ImgPreview__block">
                <img className="ImgPreview__img" src={url} loading="lazy" alt=""/>
                <div className="ImgPreview__cross"></div>
            </div>
        </div>
    );
};

export default ImgPreview;