import {
    addData,
    getData,
    deleteData
} from "../../Models/firebase-CRUD.js";

import { Tu2AmTiet } from "../../Models/MODEL.js";

export async function themTu2AmTiet(tuGoc, danhSachAmTietCuoi = []) {
    const data = new Tu2AmTiet(tuGoc, danhSachAmTietCuoi.join(", "));
    await addData("Từ 2 âm tiết", tuGoc, data.toJSON());
}

export async function layTu2AmTiet(tuGoc) {
    const data = await getData("Từ 2 âm tiết", tuGoc);
    if (!data) return null;
    return new Tu2AmTiet(tuGoc, data || "");
}

export async function layDanhSachTu2AmTiet() {
    const data = await getData("Từ 2 âm tiết", "");
    return data ? Object.keys(data) : [];
}

export async function layTuNgauNhien() {
    const data = await getData("Từ 2 âm tiết");

    if (!data) return null;

    const keys = Object.keys(data);

    const key =
        keys[Math.floor(Math.random() * keys.length)];

    const value = data[key];

    if (!value || value === ".") {
        return key;
    }

    const list = value
        .split(",")
        .map(x => x.trim())
        .filter(x => x && x !== ".");

    if (list.length === 0) return key;

    const last =
        list[Math.floor(Math.random() * list.length)];

    return `${key} ${last}`;
}

export async function themAmTietCuoi(tuGoc, amTietMoi = []) {
    const current = await getData("Từ 2 âm tiết", tuGoc);

    let list = current
        ? current.split(",").map(v => v.trim()).filter(Boolean)
        : [];

    const merged = [...new Set([...list, ...amTietMoi])];

    await addData("Từ 2 âm tiết", tuGoc, merged.join(", "));

    return merged;
}

export async function xoaTu2AmTiet(tuGoc) {
    await deleteData("Từ 2 âm tiết", tuGoc);
}