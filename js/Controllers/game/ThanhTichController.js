export default class ThanhTichController {

    constructor() {

        const params =
            new URLSearchParams(
                location.search
            );

        this.data =
            this.giaiMaDuLieu(
                params.get("data")
            );
    }

    giaiMaDuLieu(maHoa) {

        try {

            const giaiMa =
                decodeURIComponent(
                    escape(
                        atob(maHoa)
                    )
                );

            return JSON.parse(
                giaiMa
            );

        } catch {

            return {

                type: "",

                streak: 0,

                right: 0,

                wrong: 0,

                time: 0,

                skip: 0
            };
        }
    }

    getType() {

        return this.data.type;
    }

    getStreak() {

        return this.data.streak;
    }

    getRight() {

        return this.data.right;
    }

    getWrong() {

        return this.data.wrong;
    }

    getTime() {

        return this.data.time;
    }

    getSkip() {

        return this.data.skip;
    }

    getTiLeDoanDung() {

        const tong =
            this.getRight()
            +
            this.getWrong();

        if (tong === 0) {

            return 0;
        }

        return (
            this.getRight()
            /
            tong
            *
            100
        ).toFixed(0);
    }

    getTiLeDoanDungTheoMang() {

        const tong =
            this.getRight()
            +
            this.getWrong()
            +
            this.getSkip();

        if (tong === 0) {

            return 0;
        }

        return (
            this.getRight()
            /
            tong
            *
            100
        ).toFixed(0);
    }
}