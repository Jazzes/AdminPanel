import {NoteEntity} from "../../../../models/Models";

interface IProps{
    path: string
    names: Array<NoteEntity>
    host: string
    lessonPath: string
}

export class Notes {
    context = new AudioContext()
    soundBuffers : AudioBuffer[] = []
    path: string
    names: NoteEntity[]
    host: string
    counter = 12
    lessonPath: string

    constructor({path, names, host, lessonPath} : IProps) {
        this.path = path
        this.names = names
        this.host = host
        this.lessonPath = lessonPath
        this.setupSamp().then()
    }

    async getFile(Path : string, i : number) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", Path, true);
        xhr.responseType = "arraybuffer";
        xhr.send();
        xhr.onload = () => {
            this.context.decodeAudioData(
                xhr.response,
                (decodedBuffer) => {
                    this.soundBuffers[i] = decodedBuffer
                },
                () => {
                },
            );
        };
    }

    async setupSamp() {
        let r : string[] = []
        for (let i = 1; i < 11; i++) {
            this.names.forEach(ent => {
                r[Number(ent.note)] = `${this.host}/files/cover/${this.path}/${ent.file_sound}`
            })
        }
        r[11] = `${this.host}/files/static/hi-hat-23.mp3`
        r[12] = `${this.host}/files/static/hi-hat-28.mp3`
        for (let i = 1; i < 13; i++) {
            await this.getFile(r[i], i)
        }
    }

    startSamp(ind : number, accent = false) {
        const s = this.context.createBufferSource()
        s.buffer = this.soundBuffers[ind]
        const volume = this.context.createGain();
        if (accent)
            volume.gain.value = 0.8
        else
            volume.gain.value = 0.5
        s.connect(volume)
        volume.connect(this.context.destination)
        s.start(0)
    }
}