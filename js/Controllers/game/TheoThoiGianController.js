import {
    layTuNgauNhien
}
from "../data/Tu2AmTietController.js";

export default class TheoThoiGianController {

    constructor(thoiGian) {

        this.thoiGianBanDau =
            thoiGian;

        this.timeConLai =
            thoiGian;

        this.tuHienTai = "";

        this.maxStreak = 0;

        this.streak = 0;

        this.soDung = 0;

        this.soLanBoQua = 0;

        this.lichSuSai = [];

        this.thoiGianBatDau =
            Date.now();

        this.tongThoiGian = 0;
    }

    async chonTu() {

        const word =
            await layTuNgauNhien();

        if (!word) {
            return null;
        }

        this.tuHienTai = word;

        return this.shuffle(word);
    }

    shuffle(word) {

        return word
            .replace(/\s/g, "")
            .split("")
            .filter(Boolean)
            .sort(() => Math.random() - 0.5)
            .join("/");
    }

    async kiemTra(input) {

        if (input === this.tuHienTai) {

            this.streak++;

            this.soDung++;

            this.maxStreak =
                Math.max(
                    this.maxStreak,
                    this.streak
                );

            return {
                correct: true,
                next: await this.chonTu()
            };
        }

        this.streak = 0;

        this.lichSuSai.push(
            this.tuHienTai
        );

        return {
            correct: false
        };
    }

    async boQua() {

        if (
            this.timeConLai <= 15
        ) {
            return null;
        }

        this.soLanBoQua++;

        this.timeConLai -= 15;

        this.lichSuSai.push(
            this.tuHienTai
        );

        return {
            next: await this.chonTu()
        };
    }

    ketThuc() {

        this.tongThoiGian =
            Date.now()
            -
            this.thoiGianBatDau;
    }

    getState() {

        return {

            maxStreak:
                this.maxStreak,

            soDung:
                this.soDung,

            soLanBoQua:
                this.soLanBoQua,

            tongThoiGian:
                this.tongThoiGian,

            lichSuSai:
                this.lichSuSai,

            timeConLai:
                this.timeConLai
        };
    }
}