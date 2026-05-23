import TrangChuController
from "../Controllers/game/TrangChuController.js";

const controller =
    new TrangChuController();

const container =
    document.querySelector(
        ".container"
    );

function hienThiLuaChon(loai) {

    const ketQua =
        controller.hienThiLuaChon(
            loai
        );

    document
        .getElementById(
            ketQua.hienThi
        )
        .style.display =
        "block";

    ketQua.an.forEach(id => {

        document
            .getElementById(id)
            .style.display =
            "none";
    });

    container.classList.add(
        "option-visible"
    );
}

function anLuaChon(id) {

    document
        .getElementById(id)
        .style.display =
        "none";

    container.classList.remove(
        "option-visible"
    );
}

document
    .getElementById(
        "btnSoMang"
    )
    .onclick =
    () =>
        hienThiLuaChon(
            "chonSoMang"
        );

document
    .getElementById(
        "btnThoiGian"
    )
    .onclick =
    () =>
        hienThiLuaChon(
            "chonThoiGian"
        );

document
    .getElementById(
        "btnTatCa"
    )
    .onclick =
    () => {

        location.href =
            controller.taoUrl(
                "DoanTatCa"
            );
    };

document
    .getElementById(
        "dongSoMang"
    )
    .onclick =
    () =>
        anLuaChon(
            "chonSoMang"
        );

document
    .getElementById(
        "dongThoiGian"
    )
    .onclick =
    () =>
        anLuaChon(
            "chonThoiGian"
        );

document
    .getElementById(
        "xacNhanSoMang"
    )
    .onclick =
    () => {

        const soMang =
            document
                .getElementById(
                    "soMang"
                )
                .value;

        location.href =
            controller.taoUrl(
                "TheoSoMang",
                {
                    soMang
                }
            );
    };

document
    .getElementById(
        "xacNhanThoiGian"
    )
    .onclick =
    () => {

        const thoiGian =
            document
                .getElementById(
                    "thoiGian"
                )
                .value;

        location.href =
            controller.taoUrl(
                "TheoThoiGian",
                {
                    thoiGian
                }
            );
    };

document
    .querySelector(
        ".overlay"
    )
    .onclick =
    () => {

        anLuaChon(
            "chonSoMang"
        );

        anLuaChon(
            "chonThoiGian"
        );
    };