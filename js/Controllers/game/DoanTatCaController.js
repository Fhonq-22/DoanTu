export default class DoanTatCaController {
    constructor() {
        this.dsTu = [];
        this.tuHienTai = "";

        this.soLanBoQua = 5;

        this.maxStreak = 0;
        this.streak = 0;

        this.soDung = 0;
        this.soSai = 0;

        this.startTime = Date.now();
    }

    init(dsTu) {
        this.dsTu = dsTu;
        return this.chonTu();
    }

    chonTu() {
        if (this.dsTu.length === 0) return null;

        const index = Math.floor(Math.random() * this.dsTu.length);
        this.tuHienTai = this.dsTu[index];

        return this.shuffle(this.tuHienTai);
    }

    shuffle(word) {
        return word
            .replace(/\s/g, "")
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("/");
    }

    kiemTra(input) {
        const now = Date.now();
        this.startTime = now;

        if (input === this.tuHienTai) {
            this.streak++;
            this.soDung++;

            this.maxStreak = Math.max(this.maxStreak, this.streak);

            this.removeWord();

            return {
                correct: true,
                next: this.chonTu()
            };
        }

        this.streak = 0;
        this.soSai++;

        return { correct: false };
    }

    boQua() {
        if (this.soLanBoQua <= 0) return null;

        this.soLanBoQua--;

        const answer = this.tuHienTai;

        return {
            answer,
            next: this.chonTu()
        };
    }

    removeWord() {
        const i = this.dsTu.indexOf(this.tuHienTai);
        if (i !== -1) this.dsTu.splice(i, 1);
    }

    getState() {
        return {
            maxStreak: this.maxStreak,
            soDung: this.soDung,
            soSai: this.soSai,
            soLanBoQua: this.soLanBoQua
        };
    }
}