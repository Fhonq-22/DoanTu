import {
    capNhatTu,
    hienDapAn,
    themNguoiChoi,
    capNhatDiem,
    listenPhong,
    capNhatKyTuMo,
    xoaNguoiChoi,
    resetTuHienTai
} from "../Controllers/data/PhongThiController.js";

import DieuKhienCuocThiController from "../Controllers/game/DieuKhienCuocThiController.js";

const controller =
    new DieuKhienCuocThiController();

let roomId =
    new URLSearchParams(location.search)
        .get("room");

if (!roomId) {

    document.body.innerHTML = `
        <h1>Điều khiển phòng</h1>

        <input
            id="roomSearch"
            placeholder="Nhập mã phòng"
        >

        <button id="btnJoinRoom">
            Vào phòng
        </button>
    `;

    document.getElementById("btnJoinRoom").onclick = () => {

        const room =
            document
                .getElementById("roomSearch")
                .value
                .trim();

        if (!room) return;

        location.href =
            `DieuKhienPhong.html?room=${room}`;
    };

} else {

    const roomTitle =
        document.createElement("h3");

    roomTitle.id = "roomTitle";

    roomTitle.textContent =
        `Mã phòng: ${roomId}`;

    document.body.insertBefore(
        roomTitle,
        document.body.children[1]
    );

    let currentAnswer = "";
    let openedChars = [];

    function setSuggestedPoint(answer) {

        if (!answer) return;

        const point =
            answer.replace(/\s/g, "").length;

        const input =
            document.getElementById("pointValue");

        if (input) {
            input.value = point;
        }
    }

    function renderCharButtons(length, opened) {

        const container =
            document.getElementById("charButtons");

        if (!container) return;

        container.innerHTML = "";

        for (let i = 1; i <= length; i++) {

            const btn =
                document.createElement("button");

            btn.textContent = i;

            if (opened.includes(i)) {

                btn.style.background =
                    "#4caf50";

                btn.style.color =
                    "white";
            }

            btn.onclick = async () => {

                let next =
                    [...opened];

                if (next.includes(i)) {

                    next =
                        next.filter(
                            x => x !== i
                        );

                } else {

                    next.push(i);
                }

                await capNhatKyTuMo(
                    roomId,
                    next
                );
            };

            container.appendChild(btn);
        }
    }

    document.getElementById("btnNext").onclick =
        async () => {

        const data =
            await controller.taoTuMoi();

        if (!data) return;

        currentAnswer =
            data.answer;

        openedChars = [];

        await capNhatKyTuMo(
            roomId,
            []
        );

        document.getElementById("answer")
            .textContent =
            data.answer;

        setSuggestedPoint(
            data.answer
        );

        await capNhatTu(
            roomId,
            data.shuffled,
            data.answer
        );
    };

    document.getElementById("btnShow").onclick =
        async () => {

        await hienDapAn(roomId);
    };

    document.getElementById("btnAddPlayer").onclick =
        async () => {

        const name =
            document
                .getElementById("playerName")
                .value
                .trim();

        if (!name) return;

        await themNguoiChoi(
            roomId,
            name
        );

        document.getElementById("playerName")
            .value = "";
    };

    listenPhong(
        roomId,
        async (data) => {

        if (!data) return;

        currentAnswer =
            data["Đáp án"] || "";

        openedChars =
            data["Ký tự mở khóa"] || [];

        document.getElementById("answer")
            .textContent =
            currentAnswer;

        setSuggestedPoint(
            currentAnswer
        );

        if (currentAnswer) {

            renderCharButtons(
                currentAnswer.length,
                openedChars
            );
        }

        const playersDiv =
            document.getElementById("players");

        if (!playersDiv) return;

        playersDiv.innerHTML = "";

        const players =
            data["Danh sách người chơi"] || {};

        for (const name in players) {

            const div =
                document.createElement("div");

            const score =
                players[name]["Điểm"] ?? 0;

            div.innerHTML = `
                <div style="margin-bottom:10px">
                    <span>
                        ${name}: ${score}
                    </span>

                    <button data-plus="${name}">
                        +
                    </button>

                    <button data-minus="${name}">
                        -
                    </button>

                    <button data-set="${name}">
                        SET
                    </button>

                    <button data-del="${name}">
                        X
                    </button>
                </div>
            `;

            playersDiv.appendChild(div);
        }

        document
            .querySelectorAll("[data-plus]")
            .forEach(btn => {

            btn.onclick = async () => {

                const name =
                    btn.dataset.plus;

                const current =
                    players[name]["Điểm"] ?? 0;

                const value =
                    parseInt(
                        document
                            .getElementById("pointValue")
                            .value
                    ) || 0;

                await capNhatDiem(
                    roomId,
                    name,
                    current + value
                );
            };
        });

        document
            .querySelectorAll("[data-minus]")
            .forEach(btn => {

            btn.onclick = async () => {

                const name =
                    btn.dataset.minus;

                const current =
                    players[name]["Điểm"] ?? 0;

                const value =
                    parseInt(
                        document
                            .getElementById("pointValue")
                            .value
                    ) || 0;

                await capNhatDiem(
                    roomId,
                    name,
                    current - value
                );
            };
        });

        document
            .querySelectorAll("[data-set]")
            .forEach(btn => {

            btn.onclick = async () => {

                const name =
                    btn.dataset.set;

                const value =
                    parseInt(
                        document
                            .getElementById("pointValue")
                            .value
                    ) || 0;

                await capNhatDiem(
                    roomId,
                    name,
                    value
                );
            };
        });

        document
            .querySelectorAll("[data-del]")
            .forEach(btn => {

            btn.onclick = async () => {

                const name =
                    btn.dataset.del;

                await xoaNguoiChoi(
                    roomId,
                    name
                );
            };
        });
    });

    document.getElementById("btnShuffle").onclick =
        async () => {

        if (!currentAnswer) return;

        const shuffled =
            currentAnswer
                .replace(/\s/g, "")
                .split("")
                .sort(
                    () => Math.random() - 0.5
                )
                .join("/");

        await resetTuHienTai(
            roomId,
            shuffled
        );
    };
}