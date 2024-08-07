import {Audio, Fimbo, Genre, Lesson, LessonResponse, LessonType, Soul, SoulResponse, User, Variable} from "./Models";

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

export interface IAudioResponse{
    count: number,
    rows: Audio[]
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

export interface ISoulResponse{
    count: number,
    rows: SoulResponse[]
}

interface FimboWithLinks extends Fimbo{
    soul_fimbo_link: {
        fimbo_id: number,
        id: number,
        soul_option_id: number,
        text_reason: string[]
    }
}

export interface ISoulOneResponse{
    soul: Soul,
    fimbos: FimboWithLinks[];
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