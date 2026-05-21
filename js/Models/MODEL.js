// js/Models/MODEL.js

export class Tu2AmTiet {
    constructor(TuGoc, DanhSachAmTietCuoi = "") {
        this.TuGoc = TuGoc;
        this.DanhSachAmTietCuoi = DanhSachAmTietCuoi;
    }

    toJSON() {
        return this.DanhSachAmTietCuoi;
    }
}

export class TuKho {
    constructor(Tu, TrangThai = true) {
        this.Tu = Tu;
        this.TrangThai = TrangThai;
    }

    toJSON() {
        return this.TrangThai;
    }
}

export class TuMoi {
    constructor(DanhSach = []) {
        this.DanhSach = DanhSach;
    }

    toJSON() {
        return this.DanhSach;
    }
}

export class DongGop {
    constructor(UserName, Word, Status = true) {
        this.UserName = UserName;
        this.Word = Word;
        this.Status = Status;
    }

    toJSON() {
        return this.Status;
    }
}

export class NguoiChoi {
    constructor(Ten, Diem = 0) {
        this.Ten = Ten;
        this.Diem = Diem;
    }

    toJSON() {
        return {
            "Điểm": this.Diem
        };
    }
}

export class PhongThi {
    constructor(
        MaPhong,
        TuHienTai = "",
        DapAn = "",
        HienThiDapAn = false,
        DanhSachNguoiChoi = {}
    ) {
        this.MaPhong = MaPhong;

        this.TuHienTai = TuHienTai;

        this.DapAn = DapAn;

        this.HienThiDapAn = HienThiDapAn;

        this.DanhSachNguoiChoi = DanhSachNguoiChoi;
    }

    toJSON() {
        return {
            "Từ hiện tại": this.TuHienTai,
            "Đáp án": this.DapAn,
            "Hiển thị đáp án": this.HienThiDapAn,
            "Danh sách người chơi": this.DanhSachNguoiChoi
        };
    }
}