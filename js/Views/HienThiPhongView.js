import { listenPhong }
from "../Controllers/data/PhongThiController.js";

const roomId =
    new URLSearchParams(location.search)
        .get("room");

listenPhong(roomId, (data) => {

    if (!data) return;

    document.getElementById("word").textContent =
        data["Từ hiện tại"] || "";

    document.getElementById("answer").textContent =
        data["Hiển thị đáp án"]
            ? data["Đáp án"]
            : "";

    const playersDiv =
        document.getElementById("players");

    playersDiv.innerHTML = "";

    const players =
        data["Danh sách người chơi"] || {};

    for (const name in players) {

        const div =
            document.createElement("div");

        div.textContent =
            `${name}: ${players[name]["Điểm"]}`;

        playersDiv.appendChild(div);
    }
});