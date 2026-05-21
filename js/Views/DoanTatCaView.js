import DoanTatCaController from "../Controllers/game/DoanTatCaController.js";
import {
    layDanhSachTu2AmTiet,
    layTu2AmTiet
} from "../Controllers/data/Tu2AmTietController.js";

const controller = new DoanTatCaController();

function render(word) {
    document.getElementById("word").textContent = word;
}

function bindEvents() {
    document.getElementById("btnDoan").onclick = () => {
        const input = document.getElementById("inputDoan").value.trim();

        const result = controller.kiemTra(input);

        if (result.correct) {
            document.getElementById("message").textContent = "Chính xác!";
            render(result.next);
        } else {
            document.getElementById("message").textContent = "Sai rồi!";
        }

        document.getElementById("inputDoan").value = "";
    };

    document.getElementById("btnBoQua").onclick = () => {
        const result = controller.boQua();
        if (!result) return;

        document.getElementById("message").textContent =
            "Đáp án: " + result.answer;

        setTimeout(() => {
            render(result.next);
        }, 1500);
    };

    document.getElementById("btnKetThuc").onclick = () => {
        const state = controller.getState();

        document.getElementById("ketThucDiv").style.display = "block";
        document.getElementById("maxStreak").textContent = state.maxStreak;
    };

    document.getElementById("troVeTrangChu").onclick = () => {
        window.location.href = "TrangChu.html";
    };

    document.getElementById("choiLai").onclick = () => {
        location.reload();
    };
}

async function init() {
    bindEvents();

    const keys = await layDanhSachTu2AmTiet();

    const dsTu = [];

    for (const k of keys) {
        const obj = await layTu2AmTiet(k);

        if (!obj || !obj.DanhSachAmTietCuoi) continue;

        const list = obj.DanhSachAmTietCuoi
            .split(",")
            .map(x => x.trim())
            .filter(Boolean);

        dsTu.push(k, ...list);
    }

    const first = controller.init(dsTu);
    render(first);
}

init();