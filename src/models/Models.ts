interface Sample {
    id: number,
    name: string,
    path: string,
}

export interface mp4LessonEntity {
    path: string | null,
    name: string | null,
    preview: string | null,
}

export interface BeatEntity {
    num_l: number | null,
    num: number | null,
    num_r: number | null,
    accent: boolean | null
}

export interface Mp3Entity {
    mp3_fimbo: string,
    mp3_tact: string,
    mp3_square: string,
    mp3_yandex: string | null,
    mp4_youtube: mp4LessonEntity[]
}

export interface NoteEntity {
    note: string,
    file_sound: string
}

export interface Lesson extends Sample {
    subtitle: string | null,
    l_tact: number,
    l_square: number,
    l_beat: number,
    bpm: number,
    img: string,
    anim: {
        inhale: number,
        inh_delay: number,
        exhalation: number,
        exh_delay: number,
    }
    beats: BeatEntity[],
    mp3: Mp3Entity,
    lesson_type_id: number,
    visible: boolean,
    page_listen: boolean
}

export interface LessonResponse extends Lesson{
    fimbos: {
        id: number
        name: string
        path: string
    }[]
    genres: {
        id: number,
        name: string
    }[]
}

export interface Soul{
    id: number,
    text: string,
    block: string,
    additional_info: string,
    position: number,
}

export interface SoulResponse extends Soul{
    fimbos: {
        id: number
        name: string
    }[]
}

export interface FimboNotes{
    size22: NoteEntity[],
    size27: NoteEntity[],
    size32: NoteEntity[]
}

export interface LepestEntity{
    lep: string,
    transform: string,
    width: string,
    height: string,
    left: string,
    top: string,
    num_top: string,
    num_left: string
}

export interface FimboAdditionalImg{
    path: string
}

export interface FimboVideoEntity{
    path: string
    preview: string
}

export interface Fimbo extends Sample {
    img: string,
    img_listen: string,
    img_additional: FimboAdditionalImg[]
    video: FimboVideoEntity[]
    purchase: boolean
    buy_url: string,
    notes: FimboNotes
    background_first_color: string,
    background_second_color: string,
    note_default_color: string,
    note_first_color: string,
    note_second_color: string,
    position: number,
    priority_weight: number,
    lepest: LepestEntity[]
}

export interface Genre{
    id: number,
    name: string
}

export interface LessonType extends Sample {
    visible: boolean,
}

export interface Variable {
    id: number,
    name: string,
    value_of: string,
    description: string
}

export interface User{
    id: number,
    login: string,
    role: string
}

export interface Audio{
    id: number
    name: string
    path: string
    img: string
    visible: boolean
    fimbo_id: number
    fimbo_size: string
    type: string
    position: number
    mp3_path: string
}

export interface FimboLessonLink{
    lesson_id: number
    fimbo_id: number
}

export interface GenreLessonLink{
    lesson_id: number
    genre_id: number
}

export interface SoulFimboLink{
    soul_option_id: number
    fimbo_id: number
}