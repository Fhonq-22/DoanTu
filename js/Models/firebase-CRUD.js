import { ref, get, set, update, remove, onValue }
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { database } from "./firebase-config.js";

export async function addData(collection, key, data) {
    await set(ref(database, `${collection}/${key}`), data);
}

export async function getData(collection, key = "") {
    try {
        const snapshot = await get(ref(database, `${collection}/${key}`));

        if (snapshot.exists()) {
            return snapshot.val();
        }

        return null;
    } catch {
        return null;
    }
}

export async function updateData(collection, key, newData) {
    await update(ref(database, `${collection}/${key}`), newData);
}

export async function deleteData(collection, key) {
    await remove(ref(database, `${collection}/${key}`));
}

export function listenData(collection, key, callback) {
    onValue(
        ref(database, `${collection}/${key}`),
        (snapshot) => {
            callback(snapshot.val());
        }
    );
}