import {
    addData,
    getData,
    deleteData
} from "../Models/firebase-CRUD.js";

import { TuKho } from "../Models/MODEL.js";

export async function themTuKho(tu, trangThai = true) {
    const data = new TuKho(tu, trangThai);
    await addData("Từ khó", tu, data.toJSON());
}

export async function layTuKho(tu) {
    const data = await getData("Từ khó", tu);
    if (!data) return null;
    return new TuKho(tu, data);
}

export async function layDanhSachTuKho() {
    const data = await getData("Từ khó", "");
    return data ? Object.keys(data) : [];
}

export async function capNhatTuKho(tu, trangThai = true) {
    const data = new TuKho(tu, trangThai);
    await addData("Từ khó", tu, data.toJSON());
}

export async function xoaTuKho(tu) {
    await deleteData("Từ khó", tu);
}