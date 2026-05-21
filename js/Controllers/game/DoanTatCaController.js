import {
    layTuNgauNhien
} from "../data/Tu2AmTietController.js";

export default class DoanTatCaController {
    constructor() {
        this.tuHienTai = "";

        this.soLanBoQua = 5;

        this.maxStreak = 0;
        this.streak = 0;

        this.soDung = 0;
        this.soSai = 0;

        this.startTime = Date.now();
    }

    async chonTu() {
        const word = await layTuNgauNhien();

        if (!word) return null;

        this.tuHienTai = word;

        return this.shuffle(word);
    }

    shuffle(word) {
        if (!word) return "";

        return word
            .replace(/\s/g, "")
            .split("")
            .filter(Boolean)
            .sort(() => Math.random() - 0.5)
            .join("/");
    }

    async kiemTra(input) {
        const now = Date.now();
        this.startTime = now;

        if (input === this.tuHienTai) {
            this.streak++;
            this.soDung++;

            this.maxStreak = Math.max(
                this.maxStreak,
                this.streak
            );

            return {
                correct: true,
                next: await this.chonTu()
            };
        }

        this.streak = 0;
        this.soSai++;

        return {
            correct: false
        };
    }

    async boQua() {
        if (this.soLanBoQua <= 0) {
            return null;
        }

        this.soLanBoQua--;

        return {
            answer: this.tuHienTai,
            next: await this.chonTu()
        };
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