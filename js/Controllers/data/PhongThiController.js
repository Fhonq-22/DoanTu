import {
    addData,
    updateData,
    listenData
}
from "../../Models/firebase-CRUD.js";

const ROOT =
    "Dữ liệu trò chơi/Đoán từ/Phòng thi";

export async function taoPhong(roomId) {

    await addData(
        ROOT,
        roomId,
        {
            "Từ hiện tại": "",
            "Đáp án": "",
            "Hiển thị đáp án": false,
            "Ký tự mở khóa": [],
            "Danh sách người chơi": {}
        }
    );
}

export async function themNguoiChoi(roomId, playerName) {

    await updateData(
        ROOT,
        `${roomId}/Danh sách người chơi`,
        {
            [playerName]: {
                "Điểm": 0
            }
        }
    );
}

export async function capNhatTu(roomId, currentWord, answer) {

    await updateData(
        ROOT,
        roomId,
        {
            "Từ hiện tại": currentWord,
            "Đáp án": answer,
            "Hiển thị đáp án": false,
            "Ký tự mở khóa": []
        }
    );
}

export async function hienDapAn(roomId) {

    await updateData(
        ROOT,
        roomId,
        {
            "Hiển thị đáp án": true
        }
    );
}

export async function capNhatDiem(roomId, playerName, score) {

    await updateData(
        ROOT,
        `${roomId}/Danh sách người chơi/${playerName}`,
        {
            "Điểm": score
        }
    );
}

export async function capNhatKyTuMo(roomId, danhSachKyTu) {

    await updateData(
        ROOT,
        roomId,
        {
            "Ký tự mở khóa": danhSachKyTu
        }
    );
}

export async function xoaNguoiChoi(roomId, playerName) {

    await updateData(
        ROOT,
        `${roomId}/Danh sách người chơi/${playerName}`,
        null
    );
}

export async function resetTuHienTai(roomId, shuffledWord) {

    await updateData(
        ROOT,
        roomId,
        {
            "Từ hiện tại": shuffledWord
        }
    );
}

export function listenPhong(roomId, callback) {

    listenData(
        ROOT,
        roomId,
        callback
    );
}