import {
    addData,
    getData,
    deleteData
} from "../Models/firebase-CRUD.js";

import { TuMoi } from "../Models/MODEL.js";

export async function themTuMoi(danhSach = []) {
    const data = new TuMoi(danhSach);
    await addData("Từ mới", "LIST", data.toJSON());
}

export async function layTuMoi() {
    const data = await getData("Từ mới", "LIST");
    if (!data) return null;
    return new TuMoi(Array.isArray(data) ? data : []);
}

export async function layDanhSachTuMoi() {
    const data = await getData("Từ mới", "LIST");
    return Array.isArray(data) ? data : [];
}

export async function themMotTuMoi(word) {
    const current = await getData("Từ mới", "LIST");

    let list = Array.isArray(current) ? current : [];

    const updated = [...new Set([...list, word])];

    await addData("Từ mới", "LIST", updated);

    return updated;
}

export async function xoaTuMoi() {
    await deleteData("Từ mới", "LIST");
}