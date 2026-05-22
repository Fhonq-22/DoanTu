import TheoSoMangController
from "../Controllers/game/TheoSoMangController.js";

function getSoMang() {

    const params =
        new URLSearchParams(
            location.search
        );

    return parseInt(
        params.get("soMang")
    ) || 5;
}

const controller =
    new TheoSoMangController(
        getSoMang()
    );

let daKetThuc = false;

function render(word) {

    document
        .getElementById("word")
        .textContent =
        word || "";
}

function capNhatMang() {

    document
        .getElementById("soMang")
        .textContent =
        controller
            .getState()
            .soMang;
}

function khoaGame() {

    document
        .getElementById("inputDoan")
        .disabled = true;

    document
        .getElementById("btnDoan")
        .disabled = true;

    document
        .getElementById("btnBoQua")
        .disabled = true;

    document
        .getElementById("btnHuyBo")
        .disabled = true;
}

function capNhatLichSuSai() {

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

    if (daKetThuc) return;

    daKetThuc = true;

    controller.ketThuc();

    const state =
        controller.getState();

    document
        .getElementById(
            "message"
        )
        .textContent =
        "Trò chơi kết thúc!";

    document
        .getElementById(
            "ketThucDiv"
        )
        .style.display =
        "block";

    document
        .getElementById(
            "lichSuSai"
        )
        .style.display =
        "block";

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
        `${state.soTuDoanDung} câu`;

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
            "soMangBanDau"
        )
        .textContent =
        `${state.soMangBanDau} mạng`;

    capNhatLichSuSai();

    khoaGame();
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

        type: "heart",

        streak:
            state.maxStreak,

        right:
            state.soTuDoanDung,

        wrong:
            state.lichSuSai.length
            -
            state.soLanBoQua,

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
                "Thành tích Đoán từ",

            text:
                "Xem thành tích của tôi tại:",

            url:
                `${location.origin}/DoanTu/ThanhTich.html?data=${encoded}`
        })
        .catch(() => {});
}

function bindEvents() {

    document
        .getElementById(
            "btnDoan"
        )
        .onclick =
        async () => {

            if (
                daKetThuc
            ) return;

            const input =
                document
                    .getElementById(
                        "inputDoan"
                    )
                    .value
                    .trim();

            const result =
                await controller
                    .kiemTra(
                        input
                    );

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

                capNhatMang();

                if (
                    result.gameOver
                ) {

                    ketThuc();
                }
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
            ) return;

            const result =
                await controller
                    .boQua();

            capNhatMang();

            if (
                result.gameOver
            ) {

                ketThuc();

                return;
            }

            document
                .getElementById(
                    "message"
                )
                .textContent =
                "Đáp án: "
                +
                result.answer;

            setTimeout(
                () => {

                    if (
                        daKetThuc
                    ) return;

                    render(
                        result.next
                    );

                    document
                        .getElementById(
                            "message"
                        )
                        .textContent = "";

                },
                1500
            );
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

    document
        .getElementById(
            "inputDoan"
        )
        .addEventListener(
            "keypress",
            e => {

                if (
                    e.key ===
                    "Enter"
                ) {

                    document
                        .getElementById(
                            "btnDoan"
                        )
                        .click();
                }
            });
}

async function init() {

    bindEvents();

    capNhatMang();

    document
        .getElementById(
            "word"
        )
        .textContent =
        "Đang tải...";

    const word =
        await controller
            .chonTu();

    if (!word) {

        document
            .getElementById(
                "word"
            )
            .textContent =
            "Không có dữ liệu";

        return;
    }

    render(word);

    controller.batDau();
}

init();