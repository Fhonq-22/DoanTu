import { addData, updateData, listenData }
from "../../Models/firebase-CRUD.js";

const ROOT = "Dữ liệu trò chơi/Đoán từ/Phòng thi";

export async function taoPhong(roomId) {
    await addData(
        ROOT,
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

            "Hiển thị đáp án": false
        }
    );
}

export async function hienDapAn( roomId) {
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

export function listenPhong(roomId, callback) {
    listenData(
        ROOT,
        roomId,
        callback
    );
}