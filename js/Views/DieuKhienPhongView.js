import {
    capNhatTu,
    hienDapAn,
    themNguoiChoi,
    capNhatDiem,
    listenPhong,
    capNhatKyTuMo
} from "../Controllers/data/PhongThiController.js";

import DieuKhienCuocThiController
from "../Controllers/game/DieuKhienCuocThiController.js";

const controller = new DieuKhienCuocThiController();

const roomId = new URLSearchParams(location.search).get("room");

let currentAnswer = "";
let openedChars = [];

function renderCharButtons(length, opened) {

    const container = document.getElementById("charButtons");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 1; i <= length; i++) {

        const btn = document.createElement("button");
        btn.textContent = i;

        if (opened.includes(i)) {
            btn.style.background = "#4caf50";
            btn.style.color = "white";
        }

        btn.onclick = async () => {

            let next = [...opened];

            if (next.includes(i)) {
                next = next.filter(x => x !== i);
            } else {
                next.push(i);
            }

            await capNhatKyTuMo(roomId, next);
        };

        container.appendChild(btn);
    }
}

document.getElementById("btnNext").onclick = async () => {

    const data = await controller.taoTuMoi();

    if (!data) return;

    currentAnswer = data.answer;

    openedChars = [];

    await capNhatKyTuMo(roomId, []);

    document.getElementById("answer").textContent = data.answer;

    const suggestedPoint = data.answer.replace(/\s/g, "").length;

    document.getElementById("pointValue").value = suggestedPoint;

    await capNhatTu(roomId, data.shuffled, data.answer);
};

document.getElementById("btnShow").onclick = async () => {

    await hienDapAn(roomId);
};

document.getElementById("btnAddPlayer").onclick = async () => {

    const name = document.getElementById("playerName").value.trim();

    if (!name) return;

    await themNguoiChoi(roomId, name);

    document.getElementById("playerName").value = "";
};

listenPhong(roomId, async (data) => {

    if (!data) return;

    currentAnswer = data["Đáp án"] || "";
    openedChars = data["Ký tự mở khóa"] || [];

    if (currentAnswer) {
        renderCharButtons(currentAnswer.length, openedChars);
    }

    document.getElementById("answer").textContent = currentAnswer;

    const playersDiv = document.getElementById("players");

    if (!playersDiv) return;

    playersDiv.innerHTML = "";

    const players = data["Danh sách người chơi"] || {};

    for (const name in players) {

        const div = document.createElement("div");

        const score = players[name]["Điểm"] ?? 0;

        div.innerHTML = `
            <div style="margin-bottom:10px">
                <span>${name}: ${score}</span>
                <button data-plus="${name}">+</button>
                <button data-minus="${name}">-</button>
                <button data-set="${name}">SET</button>
            </div>
        `;

        playersDiv.appendChild(div);
    }

    document.querySelectorAll("[data-plus]").forEach(btn => {

        btn.onclick = async () => {

            const name = btn.dataset.plus;

            const current = players[name]["Điểm"] ?? 0;

            const value =
                parseInt(document.getElementById("pointValue").value) || 0;

            await capNhatDiem(roomId, name, current + value);
        };
    });

    document.querySelectorAll("[data-minus]").forEach(btn => {

        btn.onclick = async () => {

            const name = btn.dataset.minus;

            const current = players[name]["Điểm"] ?? 0;

            const value =
                parseInt(document.getElementById("pointValue").value) || 0;

            await capNhatDiem(roomId, name, current - value);
        };
    });

    document.querySelectorAll("[data-set]").forEach(btn => {

        btn.onclick = async () => {

            const name = btn.dataset.set;

            const value =
                parseInt(document.getElementById("pointValue").value) || 0;

            await capNhatDiem(roomId, name, value);
        };
    });
});