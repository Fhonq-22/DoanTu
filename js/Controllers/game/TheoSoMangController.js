import {
    layTuNgauNhien
}
from "../data/Tu2AmTietController.js";

export default class TheoSoMangController {

    constructor(soMang) {

        this.soMang =
            soMang;

        this.soMangBanDau =
            soMang;

        this.tuHienTai = "";

        this.lichSuSai = [];

        this.soTuDoanDung = 0;

        this.maxStreak = 0;

        this.streak = 0;

        this.soLanBoQua = 0;

        this.thoiGianBatDau =
            null;

        this.tongThoiGian =
            0;
    }

    batDau() {

        this.thoiGianBatDau =
            Date.now();
    }

    async chonTu() {

        const word =
            await layTuNgauNhien();

        if (!word) {
            return null;
        }

        this.tuHienTai =
            word;

        return this.shuffle(word);
    }

    shuffle(word) {

        return word
            .replace(/\s/g, "")
            .split("")
            .filter(Boolean)
            .sort(
                () =>
                    Math.random() - 0.5
            )
            .join("/");
    }

    async kiemTra(input) {

        if (
            input ===
            this.tuHienTai
        ) {

            this.streak++;

            this.soTuDoanDung++;

            this.maxStreak =
                Math.max(
                    this.maxStreak,
                    this.streak
                );

            return {
                correct: true,
                next:
                    await this.chonTu()
            };
        }

        this.streak = 0;

        this.soMang--;

        this.lichSuSai.push(
            this.tuHienTai
        );

        return {
            correct: false,
            gameOver:
                this.soMang <= 0
        };
    }

    async boQua() {

        this.soMang--;

        this.soLanBoQua++;

        this.lichSuSai.push(
            this.tuHienTai
        );

        if (
            this.soMang <= 0
        ) {

            return {
                gameOver: true
            };
        }

        return {
            answer:
                this.tuHienTai,

            next:
                await this.chonTu()
        };
    }

    ketThuc() {

        if (
            this.thoiGianBatDau
            === null
        ) {

            this.tongThoiGian =
                0;

            return;
        }

        this.tongThoiGian =
            Date.now()
            -
            this.thoiGianBatDau;
    }

    getState() {

        return {

            soMang:
                this.soMang,

            soMangBanDau:
                this.soMangBanDau,

            soTuDoanDung:
                this.soTuDoanDung,

            maxStreak:
                this.maxStreak,

            tongThoiGian:
                this.tongThoiGian,

            lichSuSai:
                this.lichSuSai,

            soLanBoQua:
                this.soLanBoQua
        };
    }
}