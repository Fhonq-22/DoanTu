import ThanhTichController
from "../Controllers/game/ThanhTichController.js";

const controller =
    new ThanhTichController();

function hienThiThanhTich() {

    const type =
        controller.getType();

    document
        .getElementById(
            "maxStreak"
        )
        .textContent =
        controller.getStreak()
        + " câu";

    document
        .getElementById(
            "soTuDoanDung"
        )
        .textContent =
        controller.getRight()
        + " câu";

    document
        .getElementById(
            "soTuDoanSai"
        )
        .textContent =
        controller.getWrong()
        + " câu";

    document
        .getElementById(
            "tiLeDoanDung"
        )
        .textContent =
        controller
            .getTiLeDoanDung()
        + " %";

    document
        .getElementById(
            "tongThoiGian"
        )
        .textContent =
        controller.getTime()
        + " giây";

    document
        .getElementById(
            "soLanBoQua"
        )
        .textContent =
        controller.getSkip()
        + " lần";

    switch (type) {

        case "time":

            document
                .getElementById(
                    "type"
                )
                .textContent =
                "Theo thời gian";

            document
                .getElementById(
                    "tongThoiGian"
                )
                .textContent =
                (
                    parseFloat(
                        controller.getTime()
                    )
                    +
                    parseInt(
                        controller.getSkip()
                    )
                    * 15
                )
                + " giây";

            break;

        case "heart":

            document
                .getElementById(
                    "type"
                )
                .textContent =
                "Theo số mạng";

            document
                .getElementById(
                    "tiLeDoanDung"
                )
                .textContent =
                controller
                    .getTiLeDoanDungTheoMang()
                + " %";

            break;

        case "all":

            document
                .getElementById(
                    "type"
                )
                .textContent =
                "Theo tất cả";

            break;

        default:

            document
                .getElementById(
                    "type"
                )
                .textContent =
                "Khác";
    }
}

function themIconNgauNhien() {

    const thanhTichDivs =
        document.querySelectorAll(
            ".thanhTich > div"
        );

    const randomIndex =
        Math.floor(
            Math.random()
            *
            thanhTichDivs.length
        );

    const randomDiv =
        thanhTichDivs[
            randomIndex
        ];

    const starIcon =
        document.createElement(
            "i"
        );

    starIcon.classList.add(
        "fi",
        "fi-sr-star",
        "star-icon"
    );

    starIcon.style.fontSize =
        "0.5em";

    const randomTop =
        Math.random()
        *
        (
            randomDiv.offsetHeight
            - 40
        );

    const randomLeft =
        Math.random()
        *
        (
            randomDiv.offsetWidth
            - 40
        );

    starIcon.style.top =
        `${randomTop}px`;

    starIcon.style.left =
        `${randomLeft}px`;

    randomDiv.appendChild(
        starIcon
    );

    setTimeout(
        () => {

            starIcon.style.transform =
                "rotate(360deg)";
        },
        10
    );

    setTimeout(
        () => {

            starIcon.remove();
        },
        2000
    );
}

setInterval(
    () => {

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            themIconNgauNhien();
        }

    },
    1000
);

hienThiThanhTich();