import {
    layTuNgauNhien
}
from "../data/Tu2AmTietController.js";

export default class DieuKhienCuocThiController {

    constructor() {

        this.answer = "";
    }

    async taoTuMoi() {

        const word =
            await layTuNgauNhien();

        if (!word) return null;

        this.answer = word;

        const length =
            word.length;

        return {
            answer: word,
            shuffled: this.shuffle(word),
            length: length
        };
    }

    shuffle(word) {

        return word
            .replace(/\s/g, "")
            .split("")
            .filter(Boolean)
            .sort(() => Math.random() - 0.5)
            .join("/");
    }
}