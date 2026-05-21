import { listenPhong }
from "../Controllers/data/PhongThiController.js";

const roomId =
    new URLSearchParams(location.search)
        .get("room");

const lastScores = {};
const scoreEffects = {};

listenPhong(roomId, (data) => {

    if (!data) return;

    const answer =
        data["Đáp án"] || "";

    const opened =
        data["Ký tự mở khóa"] || [];

    const wordEl =
        document.getElementById("word");

    if (wordEl) {
        wordEl.textContent =
            data["Từ hiện tại"] || "";
    }

    const answerEl =
        document.getElementById("answer");

    if (answerEl) {

        if (!answer) {

            answerEl.textContent = "";

        } else {

            let display = "";

            for (let i = 0; i < answer.length; i++) {

                const pos = i + 1;

                if (answer[i] === " ") {

                    display += " ";

                } else if (opened.includes(pos)) {

                    display += answer[i];

                } else {

                    display += "_";
                }
            }

            answerEl.textContent = display;
        }
    }

    const playersDiv =
        document.getElementById("players");

    playersDiv.innerHTML = "";

    const players =
        data["Danh sách người chơi"] || {};

    const sortedPlayers =
        Object.entries(players)
            .sort((a, b) =>
                (b[1]["Điểm"] ?? 0) - (a[1]["Điểm"] ?? 0)
            );

    let currentRank = 0;
    let previousScore = null;

    sortedPlayers.forEach(([name, player], index) => {

        const currentScore =
            player["Điểm"] ?? 0;

        if (
            previousScore === null ||
            currentScore < previousScore
        ) {
            currentRank = index + 1;
        }

        previousScore = currentScore;

        if (lastScores[name] !== undefined) {

            const diff =
                currentScore - lastScores[name];

            if (diff !== 0) {

                scoreEffects[name] =
                    diff > 0
                        ? `(+${diff}đ)`
                        : `(${diff}đ)`;

                setTimeout(() => {

                    delete scoreEffects[name];

                    const el =
                        document.querySelector(
                            `[data-effect="${name}"]`
                        );

                    if (el) {
                        el.textContent = "";
                    }

                }, 3000);
            }
        }

        lastScores[name] = currentScore;

        let rankText = "";

        if (currentRank === 1) rankText = "🥇";
        else if (currentRank === 2) rankText = "🥈";
        else if (currentRank === 3) rankText = "🥉";
        else rankText = `#${currentRank}`;

        const div =
            document.createElement("div");

        div.innerHTML = `
            <span>
                ${rankText} ${name}: ${currentScore}
            </span>

            <span data-effect="${name}">
                ${scoreEffects[name] || ""}
            </span>
        `;

        playersDiv.appendChild(div);
    });
});