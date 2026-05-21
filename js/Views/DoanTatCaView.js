import DoanTatCaController from "../Controllers/game/DoanTatCaController.js";

const controller = new DoanTatCaController();

let daKetThuc = false;

function render(word) {
    document.getElementById("word").textContent =
        word || "";
}

function khoaGame() {
    document.getElementById("inputDoan").disabled = true;

    document.getElementById("btnDoan").disabled = true;

    document.getElementById("btnBoQua").disabled = true;

    document.getElementById("btnKetThuc").disabled = true;
}

function moGame() {
    document.getElementById("inputDoan").disabled = false;

    document.getElementById("btnDoan").disabled = false;

    document.getElementById("btnBoQua").disabled = false;

    document.getElementById("btnKetThuc").disabled = false;
}

function bindEvents() {

    document.getElementById("btnDoan").onclick =
        async () => {

        if (daKetThuc) return;

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

        if (daKetThuc) return;

        const result =
            await controller.boQua();

        if (!result) {

            document.getElementById(
                "message"
            ).textContent =
                "Đã hết lượt bỏ qua";

            return;
        }

        document.getElementById(
            "message"
        ).textContent =
            "Đáp án: " + result.answer;

        const state = controller.getState();

        document.getElementById(
            "boQuaCount"
        ).textContent =
            state.soLanBoQua;

        if (state.soLanBoQua <= 0) {

            document.getElementById(
                "btnBoQua"
            ).disabled = true;
        }

        setTimeout(() => {

            if (daKetThuc) return;

            render(result.next);

            document.getElementById(
                "message"
            ).textContent = "";

        }, 1500);
    };

    document.getElementById("btnKetThuc").onclick =
        () => {

        daKetThuc = true;

        const state =
            controller.getState();

        document.getElementById(
            "ketThucDiv"
        ).style.display = "block";

        document.getElementById(
            "maxStreak"
        ).textContent =
            state.maxStreak;

        khoaGame();
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

    document.getElementById(
        "inputDoan"
    ).addEventListener(
        "keypress",
        async (e) => {

        if (e.key !== "Enter") return;

        document.getElementById(
            "btnDoan"
        ).click();
    });
}

async function init() {

    bindEvents();

    moGame();

    const first =
        await controller.chonTu();

    if (!first) {

        document.getElementById(
            "word"
        ).textContent =
            "Không có dữ liệu";

        return;
    }

    render(first);
}

init();