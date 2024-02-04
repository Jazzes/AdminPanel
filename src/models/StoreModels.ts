import {Fimbo, Genre, Lesson, LessonResponse, LessonType, User, Variable} from "./Models";

export interface UserState extends User{
    isAuth: boolean,
}

export interface MessageState{
    show: boolean
    message: string
}

export interface Host{
    host: string
}

export interface IFimboResponse{
    count: number,
    rows: Fimbo[]
}
export interface ILessonResponse{
    count: number,
    rows: LessonResponse[]
}

export interface ILessonOneResponse{
    fimbos: {
        id: number
        name: string
        path: string
    }[],
    genres: {
        id: number,
        name: string
    }[]
    lesson: Lesson
}

export interface ILessonTypeResponse{
    count: number,
    rows: LessonType[]
}
export interface IVariableResponse{
    count: number,
    rows: Variable[]
}

export interface IGenreResponse{
    count: number,
    rows: Genre[]
}