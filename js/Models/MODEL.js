// MODEL/model.js
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