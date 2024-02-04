import React, {FC, memo, useRef, useState} from 'react';
import "./LessonItemRow.scss"
import {LessonResponse, LessonType} from "../../../../models/Models";
import {Link} from "react-router-dom";
import ImgPreview from "../../../../components/PhotoPreview/ImgPreview";

interface ILessonItemRow {
    lesson: LessonResponse
    index: number
    filesHost: string
    lessonTypes: LessonType[]
}

const LessonItemRow: FC<ILessonItemRow> = memo(({lesson, index, filesHost, lessonTypes}) => {

    const noImg = useRef(false)
    const [imgPreview, setImgPreview] = useState(false)
    const pathOfLesson = (id: number) => {
        for (let i = 0; i < lessonTypes.length; ++i) {
            if (id === lessonTypes[i].id) {
                return lessonTypes[i].path
            }
        }
    }

    const pathLesson = useRef<string>(pathOfLesson(lesson.lesson_type_id)!)
    const imgURL = `${filesHost}/files/${pathLesson.current}/${
        pathLesson.current === "cover" ? (`${lesson.fimbos.length ? lesson.fimbos[0].path : "noPath"}/`)
            : ""}${lesson.path}/${lesson.img}`


    const typeOfLesson = (id: number) => {
        for (let i = 0; i < lessonTypes.length; ++i) {
            if (id === lessonTypes[i].id) {
                return lessonTypes[i].name
            }
        }
    }

    const closeImgPreview = () => {
        setImgPreview(false)
    }

    return (
        <>
            <div className={index % 2 === 1 ? "LessonItemRow__row" : "LessonItemRow__row LessonItemRow__row__color"}
                 style={lesson.visible ? {} : {background: "none", color: "#606060"}}>
                <div className="LessonItemRow__row__visible">
                    {lesson.visible ?
                        <svg width="20" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.2075 0.000139824C20.3888 0.0916789 25.46 5.89343 28 10.8854C28 10.8854 27.1062 12.7949 26.2679 14.0172C25.8622 14.6086 25.4355 15.1846 24.9871 15.7418C24.6673 16.1385 24.3371 16.5248 23.9945 16.9001C20.9331 20.2565 16.5365 22.7604 11.8938 21.7883C6.73606 20.7081 2.52887 16.0945 0 11.1325C0 11.1325 0.897908 9.22118 1.74087 8.00066C2.1185 7.45325 2.51484 6.9205 2.92989 6.40361C3.2479 6.00755 3.5776 5.62125 3.91841 5.24594C6.62324 2.27031 10.0939 -0.020609 14.2075 0.000139824ZM14.1859 2.44118C10.7427 2.42776 7.87949 4.4349 5.61426 6.9266C5.30619 7.26529 5.00923 7.61436 4.72162 7.97198C4.3434 8.4431 3.98213 8.92948 3.63781 9.42806C3.2935 9.92603 2.94042 10.5546 2.6604 11.0886C4.88998 14.9997 8.23667 18.5325 12.3538 19.3948C16.1904 20.1986 19.7709 17.9906 22.301 15.217C22.6102 14.8783 22.9089 14.5286 23.1977 14.1704C23.6069 13.662 23.9962 13.1366 24.3663 12.5965C24.7088 12.0967 25.0613 11.4669 25.3408 10.9324C23.027 6.88937 19.0683 2.52052 14.1859 2.44118Z"
                                fill="black"/>
                            <path
                                d="M14 6.11615C16.5867 6.11615 18.6871 8.30882 18.6871 11.0086C18.6871 13.709 16.5867 15.9011 14 15.9011C11.4138 15.9011 9.31345 13.709 9.31345 11.0086C9.31345 8.30882 11.4138 6.11615 14 6.11615ZM14 8.56269C15.2937 8.56269 16.3436 9.65871 16.3436 11.0086C16.3436 12.3591 15.2937 13.4551 14 13.4551C12.7069 13.4551 11.657 12.3591 11.657 11.0086C11.657 9.65871 12.7069 8.56269 14 8.56269Z"
                                fill="black"/>
                        </svg>
                        :
                        <svg width="20" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.25667 0.539978L1.44624 2.41416L24.7433 26.54L26.5538 24.6652L3.25667 0.539978Z"
                                  fill="black"/>
                            <path
                                d="M5.27112 6.37497L6.97516 8.13958C5.10978 9.78433 3.62437 11.8316 2.6645 13.6229L2.66157 13.6289C5.33484 18.2575 9.57652 22.6318 14.9301 21.9683C16.3751 21.7891 17.7232 21.2776 18.9549 20.5457L20.6799 22.3315C18.2791 23.9272 15.5269 24.7723 12.545 24.3546C7.16807 23.6016 2.77147 19.0348 0 13.6713C1.30127 10.9599 3.0813 8.36598 5.27112 6.37497ZM9.14685 3.75984C10.6504 3.0661 12.2773 2.65809 14.0146 2.62903C14.1111 2.62843 15.2563 2.68473 15.7754 2.77311C16.101 2.8288 16.4254 2.89842 16.7452 2.98498C21.8456 4.36095 25.6243 8.82605 28 13.4261C27.0033 15.5104 25.6979 17.5444 24.1412 19.2872L22.4886 17.5759C23.6385 16.2925 24.5972 14.8639 25.3355 13.4782C25.3355 13.4782 24.5931 12.2421 24.0301 11.466C23.6683 10.9672 23.2877 10.4829 22.8879 10.0162C22.5722 9.64813 21.3464 8.39807 21.0547 8.13776C19.0975 6.39495 16.7995 5.02745 14.0433 5.05045C12.9758 5.06801 11.9493 5.28594 10.9748 5.65278L9.14685 3.75984Z"
                                fill="black"/>
                            <path
                                d="M9.90973 11.1791L11.3121 12.6307C11.2203 12.9195 11.1701 13.2282 11.1701 13.5484C11.1701 15.1659 12.438 16.4789 14 16.4789C14.3092 16.4789 14.6074 16.4275 14.8862 16.3318L16.2886 17.7841C15.6117 18.1776 14.8307 18.4015 14 18.4015C11.4133 18.4015 9.31346 16.2271 9.31346 13.5484C9.31346 12.6882 9.53034 11.8801 9.90973 11.1791ZM13.9135 8.69649C13.9421 8.69589 13.9714 8.69528 14 8.69528C16.5867 8.69528 18.6865 10.8703 18.6865 13.5484C18.6865 13.5787 18.6865 13.6083 18.686 13.638L13.9135 8.69649Z"
                                fill="black"/>
                        </svg>
                    }
                </div>

                <div className="LessonItemRow__row__id">
                    {lesson.id}
                </div>
                <div className="LessonItemRow__row__position">
                    {lesson.position}
                </div>
                <div className="LessonItemRow__row__name">
                    {lesson.name}
                </div>
                <div className="LessonItemRow__row__subtitle">
                    {lesson.subtitle}
                </div>
                <div className="LessonItemRow__row__bpm">
                    {lesson.bpm}
                </div>
                <div className="LessonItemRow__row__preview">
                    <img className="LessonItemRow__row__preview__photo"
                         src={imgURL} onClick={() => {
                        if (!noImg.current)
                            setImgPreview(true)
                    }} onError={() => noImg.current = true}
                         loading="lazy" alt=""/>
                </div>
                <div className="LessonItemRow__row__path">
                    {lesson.path}
                </div>
                <div className="LessonItemRow__row__fimbos">
                    {lesson.fimbos.map(ent =>
                        <div key={ent.id}>
                            {ent.name}
                        </div>
                    )}
                </div>
                <div className="LessonItemRow__row__genres">
                    {lesson.genres.map(ent =>
                        <div key={ent.id}>
                            {ent.name}
                        </div>
                    )}
                </div>
                <div className="LessonItemRow__row__type">
                    {typeOfLesson(lesson.lesson_type_id)}
                </div>

                <div className="LessonItemRow__row__edit">
                    <Link to={'/lesson/' + lesson.id}>
                        <svg className="LessonItemRow__row__edit__pen" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 50 50" width="20"
                             height="20">
                            <path
                                d="M46.575,3.426C45.624,2.475,44.378,2,43.133,2c-1.246,0-2.492,0.476-3.443,1.426c0,0-0.067,0.067-0.159,0.159c-0.009,0.008-0.021,0.011-0.029,0.02L4.302,38.804c-0.124,0.124-0.213,0.278-0.259,0.448l-2.009,7.489c-0.093,0.345,0.006,0.713,0.259,0.966C2.483,47.897,2.738,48,3,48c0.086,0,0.173-0.011,0.259-0.034l7.489-2.01c0.169-0.046,0.324-0.135,0.448-0.259l35.199-35.198c0.011-0.011,0.014-0.025,0.024-0.037c0.089-0.089,0.153-0.153,0.153-0.153C48.475,8.408,48.475,5.326,46.575,3.426z M45.16,4.84c1.118,1.118,1.117,2.937-0.001,4.055c-0.329,0.329-0.612,0.611-0.854,0.854L40.25,5.694c0.459-0.459,0.854-0.854,0.854-0.854C41.646,4.298,42.366,4,43.133,4C43.898,4,44.619,4.299,45.16,4.84z M5.604,41.154l3.242,3.241l-4.431,1.189L5.604,41.154z"/>
                        </svg>
                    </Link>
                </div>


            </div>
            {imgPreview &&
                <ImgPreview closeImgPreview={closeImgPreview} url={imgURL}/>
            }
        </>
    );
})

export default LessonItemRow;