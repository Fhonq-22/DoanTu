import {addData, getData, deleteData} from "../Models/firebase-CRUD.js";

export async function themDongGop(userName, word, status = false) {
    await addData(`Đóng góp/${userName}`, word, status);
}

export async function layDongGop(userName, word) {
    return await getData(`Đóng góp/${userName}`, word);
}

export async function layDanhSachDongGop(userName) {
    const data = await getData(`Đóng góp/${userName}`,"");

    return data ? Object.keys(data) : [];
}

export async function capNhatDongGop(userName, word, status) {
    await addData(`Đóng góp/${userName}`,word,status);
}

export async function xoaDongGop(userName, word) {
    await deleteData(`Đóng góp/${userName}`,word);
}