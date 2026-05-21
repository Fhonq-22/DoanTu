import {
    taoPhong
} from "../Controllers/data/PhongThiController.js";

document.getElementById(
    "btnCreate"
).onclick = async () => {

    const roomId =
        document
            .getElementById("roomId")
            .value
            .trim();

    if (!roomId) return;

    await taoPhong(roomId);

    window.location.href =
        `DieuKhienPhong.html?room=${roomId}`;
};