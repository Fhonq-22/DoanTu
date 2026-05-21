import {
    taoPhong
} from "../Controllers/data/PhongThiController.js";

const btn =
    document.getElementById("btnCreate");

btn.onclick = async () => {

    const input =
        document.getElementById("roomId");

    const roomId =
        input.value.trim();

    if (!roomId) return;

    btn.disabled = true;

    try {

        await taoPhong(roomId);

        window.location.href =
            `DieuKhienPhong.html?room=${encodeURIComponent(roomId)}`;

    } finally {

        btn.disabled = false;
    }
};