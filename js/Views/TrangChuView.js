import TrangChuController
from "../Controllers/game/TrangChuController.js";

const controller =
    new TrangChuController();

function hienThiLuaChon(id) {

    const result =
        controller
            .hienThiLuaChon(
                id
            );

    document
        .getElementById(
            result.hienThi
        )
        .style.display =
        "block";

    document
        .getElementById(
            result.an
        )
        .style.display =
        "none";

    document
        .querySelector(
            ".container"
        )
        .classList.add(
            "option-visible"
        );
}

function dongLuaChon(id) {

    document
        .getElementById(id)
        .style.display =
        "none";

    document
        .querySelector(
            ".container"
        )
        .classList.remove(
            "option-visible"
        );
}

document
    .getElementById(
        "btnSoMang"
    )
    .onclick =
    () => {

    hienThiLuaChon(
        "chonSoMang"
    );
};

document
    .getElementById(
        "btnThoiGian"
    )
    .onclick =
    () => {

    hienThiLuaChon(
        "chonThoiGian"
    );
};

document
    .getElementById(
        "dongSoMang"
    )
    .onclick =
    () => {

    dongLuaChon(
        "chonSoMang"
    );
};

document
    .getElementById(
        "dongThoiGian"
    )
    .onclick =
    () => {

    dongLuaChon(
        "chonThoiGian"
    );
};

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
        controller
            .taoUrl(
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
        controller
            .taoUrl(
                "TheoThoiGian",
                {
                    thoiGian
                }
            );
};

document
    .getElementById(
        "btnDoanTatCa"
    )
    .onclick =
    () => {

    location.href =
        controller
            .taoUrl(
                "DoanTatCa"
            );
};