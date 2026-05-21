import {
    getDatabase,
    ref,
    set,
    update,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { app }
from "../../Models/firebase-config.js";

const db = getDatabase(app);

export async function taoPhong(roomId) {

    await set(
        ref(db, `rooms/${roomId}`),
        {
            currentWord: "",
            answer: "",
            showAnswer: false,

            players: {}
        }
    );
}

export async function themNguoiChoi(
    roomId,
    playerName
) {

    await update(
        ref(db, `rooms/${roomId}/players`),
        {
            [playerName]: {
                score: 0
            }
        }
    );
}

export async function capNhatTu(
    roomId,
    currentWord,
    answer
) {

    await update(
        ref(db, `rooms/${roomId}`),
        {
            currentWord,
            answer,
            showAnswer: false
        }
    );
}

export async function hienDapAn(
    roomId
) {

    await update(
        ref(db, `rooms/${roomId}`),
        {
            showAnswer: true
        }
    );
}

export async function capNhatDiem(
    roomId,
    playerName,
    score
) {

    await update(
        ref(
            db,
            `rooms/${roomId}/players/${playerName}`
        ),
        {
            score
        }
    );
}

export function listenPhong(
    roomId,
    callback
) {

    onValue(
        ref(db, `rooms/${roomId}`),
        (snapshot) => {

        callback(snapshot.val());
    });
}