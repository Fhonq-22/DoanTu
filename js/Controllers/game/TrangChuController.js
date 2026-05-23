export default class TrangChuController {

    hienThiLuaChon(loai) {

        return {

            hienThi:
                loai,

            an:
                [
                    "chonSoMang",
                    "chonThoiGian"
                ].filter(
                    item =>
                        item !== loai
                )
        };
    }

    taoUrl(
        trang,
        thamSo = {}
    ) {

        const query =
            new URLSearchParams(
                thamSo
            ).toString();

        return query
            ? `${trang}.html?${query}`
            : `${trang}.html`;
    }
}