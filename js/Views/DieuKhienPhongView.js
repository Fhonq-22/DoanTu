import {
    capNhatTu,
    hienDapAn,
    themNguoiChoi,
    capNhatDiem,
    listenPhong
}
from "../Controllers/data/PhongThiController.js";

import DieuKhienCuocThiController
from "../Controllers/game/DieuKhienCuocThiController.js";

const controller =
    new DieuKhienCuocThiController();

const roomId =
    new URLSearchParams(location.search)
        .get("room");

document.getElementById("btnNext").onclick =
    async () => {

    const data =
        await controller.taoTuMoi();

    if (!data) return;

    document.getElementById("answer").textContent =
        data.answer;

    const suggestedPoint =
        data.answer
            .replace(/\s/g, "")
            .length;

    document.getElementById("pointValue").value =
        suggestedPoint;

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

    document.getElementById(
        "playerName"
    ).value = "";
};

listenPhong(roomId, async (data) => {

    if (!data) return;

    const playersDiv =
        document.getElementById("players");

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
});