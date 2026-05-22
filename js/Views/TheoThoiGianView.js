import TheoThoiGianController
from "../Controllers/game/TheoThoiGianController.js";

const thoiGian =
    parseInt(
        new URLSearchParams(
            location.search
        ).get("thoiGian")
    ) || 60;

const controller =
    new TheoThoiGianController(
        thoiGian
    );

let timer = null;

let daKetThuc = false;

let thoiDiemKetThuc = 0;

function render(word) {

    document
        .getElementById("word")
        .textContent =
        word || "";
}

function capNhatThoiGian() {

    const conLai =
        Math.max(
            0,
            Math.ceil(
                (
                    thoiDiemKetThuc
                    - Date.now()
                ) / 1000
            )
        );

    controller.timeConLai =
        conLai;

    document
        .getElementById(
            "timeConLai"
        )
        .textContent =
        `Thời gian còn lại: ${conLai} giây`;
}

function hienThiLichSuSai() {

    const ul =
        document.getElementById(
            "danhSachSai"
        );

    ul.innerHTML = "";

    const counts = {};

    controller
        .getState()
        .lichSuSai
        .forEach(word => {

            counts[word] =
                (counts[word] || 0)
                + 1;
        });

    for (
        const word
        in counts
    ) {

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            `${word} (${counts[word]})`;

        ul.appendChild(li);
    }
}

function ketThuc() {

    if (daKetThuc) {
        return;
    }

    daKetThuc = true;

    clearInterval(timer);

    controller.ketThuc();

    const state =
        controller.getState();

    document
        .querySelector(
            ".end-game-container"
        )
        .style.display =
        "flex";

    document
        .getElementById(
            "maxStreak"
        )
        .textContent =
        `${state.maxStreak} câu`;

    document
        .getElementById(
            "soTuDoanDung"
        )
        .textContent =
        `${state.soDung} câu`;

    document
        .getElementById(
            "tongThoiGian"
        )
        .textContent =
        `${(
            state.tongThoiGian
            / 1000
        ).toFixed(2)} giây`;

    document
        .getElementById(
            "soLanBoQua"
        )
        .textContent =
        `${state.soLanBoQua} lần`;

    document
        .getElementById(
            "inputDoan"
        )
        .disabled = true;

    document
        .getElementById(
            "btnDoan"
        )
        .disabled = true;

    document
        .getElementById(
            "btnBoQua"
        )
        .disabled = true;

    document
        .getElementById(
            "btnHuyBo"
        )
        .disabled = true;

    hienThiLichSuSai();
}

function encodeBase64(str) {

    return btoa(
        unescape(
            encodeURIComponent(str)
        )
    );
}

function chiaSeThanhTich() {

    const state =
        controller.getState();

    const data = {

        type: "time",

        streak:
            state.maxStreak,

        right:
            state.soDung,

        wrong:
            new Set(
                state.lichSuSai
            ).size,

        time:
            (
                state.tongThoiGian
                / 1000
            ).toFixed(2),

        skip:
            state.soLanBoQua
    };

    const encoded =
        encodeBase64(
            JSON.stringify(data)
        );

    navigator
        .share({

            title:
                "Thành tích Đoán từ theo thời gian",

            text:
                "Xem thành tích của tôi tại:",

            url:
                `${location.origin}/DoanTu/ThanhTich.html?data=${encoded}`
        })
        .catch(() => {});
}

async function init() {

    document
        .getElementById(
            "word"
        )
        .textContent =
        "Đang tải...";

    const first =
        await controller.chonTu();

    if (!first) {

        document
            .getElementById(
                "word"
            )
            .textContent =
            "Không có dữ liệu";

        return;
    }

    render(first);

    controller.batDau();

    thoiDiemKetThuc =
        Date.now()
        +
        (
            thoiGian
            * 1000
        );

    capNhatThoiGian();

    timer =
        setInterval(() => {

            capNhatThoiGian();

            if (
                controller.timeConLai <= 0
            ) {

                document
                    .getElementById(
                        "message"
                    )
                    .textContent =
                    "Hết thời gian!";

                ketThuc();
            }

        }, 100);
}

document
    .getElementById(
        "btnDoan"
    )
    .onclick =
    async () => {

        if (
            daKetThuc
        ) {
            return;
        }

        const input =
            document
                .getElementById(
                    "inputDoan"
                )
                .value
                .trim();

        const result =
            await controller
                .kiemTra(input);

        if (
            result.correct
        ) {

            document
                .getElementById(
                    "message"
                )
                .textContent =
                "Chính xác!";

            render(
                result.next
            );

        } else {

            document
                .getElementById(
                    "message"
                )
                .textContent =
                "Sai rồi!";
        }

        document
            .getElementById(
                "inputDoan"
            )
            .value = "";
    };

document
    .getElementById(
        "btnBoQua"
    )
    .onclick =
    async () => {

        if (
            daKetThuc
        ) {
            return;
        }

        const result =
            await controller
                .boQua();

        if (!result) {

            document
                .getElementById(
                    "message"
                )
                .textContent =
                "Thời gian quá ít, không thể bỏ qua!";

            return;
        }

        thoiDiemKetThuc -=
            15000;

        render(
            result.next
        );

        capNhatThoiGian();

        document
            .getElementById(
                "message"
            )
            .textContent =
            "Đã bỏ qua!";
    };

document
    .getElementById(
        "btnHuyBo"
    )
    .onclick =
    () => {

        document
            .getElementById(
                "inputDoan"
            )
            .value = "";

        document
            .getElementById(
                "message"
            )
            .textContent = "";
    };

document
    .getElementById(
        "inputDoan"
    )
    .addEventListener(
        "keypress",
        e => {

            if (
                e.key === "Enter"
            ) {

                document
                    .getElementById(
                        "btnDoan"
                    )
                    .click();
            }
        });

document
    .getElementById(
        "choiLai"
    )
    .onclick =
    () => {

        location.reload();
    };

document
    .getElementById(
        "troVeTrangChu"
    )
    .onclick =
    () => {

        location.href =
            "TrangChu.html";
    };

document
    .getElementById(
        "chiaSeThanhTich"
    )
    .onclick =
    chiaSeThanhTich;

init();