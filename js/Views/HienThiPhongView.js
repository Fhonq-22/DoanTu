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

    const charDisplay =
        document.getElementById("charDisplay");

    if (answerEl) {

        answerEl.textContent =
            data["Hiển thị đáp án"]
                ? answer
                : "";
    }

    if (charDisplay && answer) {

        charDisplay.innerHTML = "";

        for (let i = 0; i < answer.length; i++) {

            const pos = i + 1;

            const span =
                document.createElement("span");

            span.style.display = "inline-block";
            span.style.width = "30px";
            span.style.height = "30px";
            span.style.margin = "2px";
            span.style.textAlign = "center";
            span.style.lineHeight = "30px";
            span.style.border = "1px solid #000";

            if (answer[i] === " ") {

                span.textContent = " ";

            } else if (opened.includes(pos)) {

                span.textContent = answer[i];

            } else {

                span.textContent = "_";
            }

            charDisplay.appendChild(span);
        }
    }

    const playersDiv =
        document.getElementById("players");

    playersDiv.innerHTML = "";

    const players =
        data["Danh sách người chơi"] || {};

    const sortedPlayers =
        Object.entries(players)
            .sort(
                (a, b) =>
                    (b[1]["Điểm"] ?? 0)
                    - (a[1]["Điểm"] ?? 0)
            );

    let currentRank = 0;
    let previousScore = null;

    sortedPlayers.forEach(([name, player], index) => {

        const currentScore =
            player["Điểm"] ?? 0;

        if (
            previousScore === null
            || currentScore < previousScore
        ) {
            currentRank = index + 1;
        }

        previousScore =
            currentScore;

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

        lastScores[name] =
            currentScore;

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