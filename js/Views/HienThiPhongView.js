import {
    listenPhong
} from "../Controllers/data/PhongThiController.js";

const roomId =
    new URLSearchParams(
        location.search
    ).get("room");

listenPhong(roomId, (data) => {

    if (!data) return;

    document.getElementById(
        "word"
    ).textContent =
        data.currentWord || "";

    document.getElementById(
        "answer"
    ).textContent =
        data.showAnswer
            ? data.answer
            : "";

    const playersDiv =
        document.getElementById(
            "players"
        );

    playersDiv.innerHTML = "";

    const players =
        data.players || {};

    for (const name in players) {

        const div =
            document.createElement("div");

        div.textContent =
            `${name}: ${players[name].score}`;

        playersDiv.appendChild(div);
    }
});