export default class TrangChuController {

    hienThiLuaChon(loai) {

        return {

            hienThi:
                loai,

            an:
                loai ===
                "chonSoMang"
                    ? "chonThoiGian"
                    : "chonSoMang"
        };
    }

    taoUrl(
        trang,
        thamSo = {}
    ) {

        const query =
            new URLSearchParams(
                thamSo
            );

        return query
            .toString()
            ? `${trang}.html?${query}`
            : `${trang}.html`;
    }
}