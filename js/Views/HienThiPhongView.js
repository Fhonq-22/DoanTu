import { listenPhong }
from "../Controllers/data/PhongThiController.js";

const roomId =
    new URLSearchParams(location.search)
        .get("room");

const roomSelector =
    document.getElementById("roomSelector");

const roomContent =
    document.getElementById("roomContent");

if (!roomId) {

    if (roomContent) {
        roomContent.style.display = "none";
    }

    document.getElementById("btnJoinRoom").onclick =
        () => {

        const room =
            document
                .getElementById("roomInput")
                .value
                .trim();

        if (!room) return;

        location.href =
            `HienThiPhong.html?room=${room}`;
    };

} else {

    if (roomSelector) {
        roomSelector.style.display = "none";
    }

    if (roomContent) {
        roomContent.style.display = "block";
    }

    const roomInfo =
        document.getElementById("roomInfo");

    if (roomInfo) {

        roomInfo.textContent =
            `Phòng: ${roomId}`;
    }

    const lastScores = {};

    const scoreEffects = {};

    listenPhong(roomId, (data) => {

        if (!data) return;

        const answer =
            data["Đáp án"] || "";

        const opened =
            data["Ký tự mở khóa"] || [];

        const pointValue =
            answer
                .replace(/\s/g, "")
                .length;

        const pointEl =
            document.getElementById("pointValue");

        if (pointEl) {

            pointEl.textContent =
                `Giá trị từ: ${pointValue} điểm`;
        }

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

        if (charDisplay) {

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

                if (opened.includes(pos)) {

                    span.textContent =
                        answer[i];

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

        let rankGroup = 0;

        let previousScore = null;

        sortedPlayers.forEach(
            ([name, player]) => {

            const currentScore =
                player["Điểm"] ?? 0;

            if (
                previousScore === null
                || currentScore < previousScore
            ) {

                rankGroup++;

                currentRank =
                    rankGroup;
            }

            previousScore =
                currentScore;

            if (
                lastScores[name] !== undefined
            ) {

                const diff =
                    currentScore -
                    lastScores[name];

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

            let icon = "🏆";

            if (currentRank === 1) {

                icon = "🥇";

            } else if (
                currentRank === 2
            ) {

                icon = "🥈";

            } else if (
                currentRank === 3
            ) {

                icon = "🥉";
            }

            const div =
                document.createElement("div");

            div.innerHTML = `
                <span>
                    ${icon}
                    ${currentRank}
                    -
                    ${name}
                    :
                    ${currentScore}
                </span>

                <span
                    data-effect="${name}"
                >
                    ${scoreEffects[name] || ""}
                </span>
            `;

            playersDiv.appendChild(div);
        });
    });
}