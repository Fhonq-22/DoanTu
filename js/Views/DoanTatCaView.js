import DoanTatCaController from "../Controllers/game/DoanTatCaController.js";

const controller = new DoanTatCaController();

function render(word) {
    document.getElementById("word").textContent =
        word || "";
}

function bindEvents() {
    document.getElementById("btnDoan").onclick =
        async () => {

        const input =
            document
                .getElementById("inputDoan")
                .value
                .trim();

        const result =
            await controller.kiemTra(input);

        if (result.correct) {
            document.getElementById(
                "message"
            ).textContent = "Chính xác!";

            render(result.next);
        } else {
            document.getElementById(
                "message"
            ).textContent = "Sai rồi!";
        }

        document.getElementById(
            "inputDoan"
        ).value = "";
    };

    document.getElementById("btnBoQua").onclick =
        async () => {

        const result =
            await controller.boQua();

        if (!result) return;

        document.getElementById(
            "message"
        ).textContent =
            "Đáp án: " + result.answer;

        setTimeout(() => {
            render(result.next);
        }, 1500);
    };

    document.getElementById("btnKetThuc").onclick =
        () => {

        const state = controller.getState();

        document.getElementById(
            "ketThucDiv"
        ).style.display = "block";

        document.getElementById(
            "maxStreak"
        ).textContent = state.maxStreak;
    };

    document.getElementById(
        "troVeTrangChu"
    ).onclick = () => {
        window.location.href =
            "TrangChu.html";
    };

    document.getElementById(
        "choiLai"
    ).onclick = () => {
        location.reload();
    };
}

async function init() {
    bindEvents();

    const first =
        await controller.chonTu();

    if (!first) {
        document.getElementById(
            "word"
        ).textContent = "Không có dữ liệu";

        return;
    }

    render(first);
}

init();