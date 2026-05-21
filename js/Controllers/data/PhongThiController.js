import { addData, updateData, listenData }
from "../../Models/firebase-CRUD.js";

export async function taoPhong(roomId) {
    await addData(
        "Phòng thi",
        roomId,
        {
            "Từ hiện tại": "",
            "Đáp án": "",
            "Hiển thị đáp án": false,
            "Danh sách người chơi": {}
        }
    );
}

export async function themNguoiChoi(roomId, playerName) {
    await updateData(
        "Phòng thi",
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
        "Phòng thi",
        roomId,
        {
            "Từ hiện tại": currentWord,
            "Đáp án": answer,
            "Hiển thị đáp án": false
        }
    );
}

export async function hienDapAn(roomId) {
    await updateData(
        "Phòng thi",
        roomId,
        {
            "Hiển thị đáp án": true
        }
    );
}

export async function capNhatDiem(roomId, playerName, score) {
    await updateData(
        "Phòng thi",
        `${roomId}/Danh sách người chơi/${playerName}`,
        {
            "Điểm": score
        }
    );
}

export function listenPhong(roomId, callback) {
    listenData(
        "Phòng thi",
        roomId,
        callback
    );
}